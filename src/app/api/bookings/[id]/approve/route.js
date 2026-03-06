import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { NextResponse } from 'next/server';

// POST /api/bookings/[id]/approve
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const bookingId = params.id;
    const lenderId = session.user.id;

    const result = await prisma.$transaction(async (tx) => {

      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { listing: true }
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.listing.lenderId !== lenderId) {
        throw new Error('Unauthorized: Only the lender can approve this booking');
      }

      if (booking.status !== 'PENDING') {
        throw new Error(`Booking is already ${booking.status}`);
      }

      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      // Check for overlap
      const overlappingBlocks = await tx.booking.findMany({
        where: {
          listingId: booking.listingId,
          status: 'APPROVED',
          OR: [
            { startDate: { lte: end }, endDate: { gte: start } }
          ]
        }
      });

      if (overlappingBlocks.length > 0) {
        throw new Error('Concurrency Conflict: One or more dates have already been booked.');
      }

      // Update Booking Status
      const updatedBooking = await tx.booking.update({
        where: { id: booking.id },
        data: { status: 'APPROVED' }
      });

      // Stripe logic skipped for now

      return updatedBooking;
    });

    return NextResponse.json({
      success: true,
      message: 'Booking successfully approved.',
      booking: result
    });

  } catch (error) {
    console.error('Booking Approval Workflow Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
