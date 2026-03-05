import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Assumes Prisma client is instantiated here
// import { stripe } from '@/lib/stripe'; // Assumes Stripe client is instantiated here

/** // Dummy prisma implementation for demonstration
const prisma = {
    $transaction: async (cb) => cb(prisma),
    booking: { findUnique: async () => ({}), update: async () => ({}) },
    blockedDate: { createMany: async () => ({}) }
};
const stripe = { paymentIntents: { capture: async () => ({}) } };
*/

// POST /api/bookings/[id]/approve
export async function POST(request, { params }) {
  try {
    const bookingId = params.id;
    const { lenderId } = await request.json(); // Authenticated lender ID

    // We use an interactive transaction to prevent race conditions (Concurrency Control).
    // This guarantees that if two requests try to approve bookings for the same dates,
    // only one will succeed in creating the BlockedDates and capturing payment.
    const result = await prisma.$transaction(async (tx) => {
      
      // 1. Fetch and Lock the Booking
      // In a real high-concurrency environment, you might use Prisma's raw query:
      // await tx.$queryRaw`SELECT * FROM "Booking" WHERE id = ${bookingId} FOR UPDATE`;
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { listing: { include: { blockedDates: true } } }
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      // 2. Validate Authorization and State
      if (booking.listing.lenderId !== lenderId) {
        throw new Error('Unauthorized: Only the lender can approve this booking');
      }
      
      if (booking.status !== 'PENDING') {
        throw new Error(`Booking is already ${booking.status}`);
      }

      // 3. Concurrency Check: Verify dates are still available
      // Check if any blocked dates overlap with the requested booking dates
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      
      const overlappingBlocks = await tx.blockedDate.findMany({
        where: {
          listingId: booking.listingId,
          date: {
            gte: start,
            lte: end
          }
        }
      });

      if (overlappingBlocks.length > 0) {
        throw new Error('Concurrency Conflict: One or more dates have already been blocked.');
      }

      // 4. Create Blocked Dates for the Rental Period
      // Generate an array of dates between start and end
      const datesToBlock = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        datesToBlock.push({
          listingId: booking.listingId,
          date: new Date(d),
          reason: 'BOOKED',
          bookingId: booking.id
        });
      }

      // Insert the blocked dates. If another transaction already inserted them,
      // the unique constraint @@unique([listingId, date]) would throw, rolling back the transaction.
      await tx.blockedDate.createMany({
        data: datesToBlock
      });

      // 5. Update Booking Status
      const updatedBooking = await tx.booking.update({
        where: { id: booking.id },
        data: { status: 'APPROVED' }
      });

      // 6. Payment Execution: Capture Escrow Funds via Stripe
      if (booking.stripeIntentId) {
        // We capture the authorized off-session payment intent
        await stripe.paymentIntents.capture(booking.stripeIntentId);
        // Note: Stripe Connect logic for transferring the resulting funds 
        // to the lender would usually happen on a cron job 8 days later,
        // or via a separate transfer_group upon fulfillment.
      }

      return updatedBooking;
    }, {
      maxWait: 5000, 
      timeout: 10000 
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking successfully approved and funds captured in escrow.',
      booking: result 
    }, { status: 200 });

  } catch (error) {
    console.error('Booking Approval Workflow Error:', error);
    
    // Distinguish between conflict errors and standard errors
    if (error.message.includes('Concurrency Conflict') || error.code === 'P2002') {
      return NextResponse.json({ error: 'Dates are no longer available.' }, { status: 409 }); // HTTP 409 Conflict
    }

    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
