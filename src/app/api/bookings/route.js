import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { listingId, startDate, endDate, totalPrice } = await req.json();

        if (!listingId || !startDate || !endDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // 1. Check if listing exists and is active
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            include: { blockedDates: true }
        });

        if (!listing || !listing.isActive) {
            return NextResponse.json({ error: 'Listing not found or inactive' }, { status: 404 });
        }

        // 2. Prevent lending to self
        if (listing.lenderId === session.user.id) {
            return NextResponse.json({ error: 'You cannot rent your own item' }, { status: 400 });
        }

        // 3. Check for availability conflicts
        const conflictingBlocks = await prisma.blockedDate.findFirst({
            where: {
                listingId,
                date: {
                    gte: start,
                    lte: end
                }
            }
        });

        if (conflictingBlocks) {
            return NextResponse.json({ error: 'Item is not available for selected dates' }, { status: 409 });
        }

        // 4. Create the booking in PENDING state
        const booking = await prisma.booking.create({
            data: {
                listingId,
                renterId: session.user.id,
                startDate: start,
                endDate: end,
                totalPrice: Number(totalPrice),
                status: 'PENDING'
            }
        });

        // 5. Automatically block the dates with 'BOOKED' reason if approved, 
        // but since it's PENDING, maybe we only block after approval?
        // Standard Archiv protocol: Block immediately once a "Real" request is in, or wait for approval?
        // Let's block them as PENDING so others can't request while it's in the approval queue.

        const datesToBlock = [];
        let curr = new Date(start);
        while (curr <= end) {
            datesToBlock.push({
                listingId,
                date: new Date(curr),
                reason: 'BOOKED',
                bookingId: booking.id
            });
            curr.setDate(curr.getDate() + 1);
        }

        await prisma.blockedDate.createMany({
            data: datesToBlock
        });

        return NextResponse.json({ success: true, bookingId: booking.id });
    } catch (error) {
        console.error('Create booking error:', error);
        return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}
