import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id: bookingId } = await params;
        const lenderId = session.user.id;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { listing: true }
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.listing.lenderId !== lenderId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (booking.status !== 'PENDING') {
            return NextResponse.json({ error: `Booking is already ${booking.status}` }, { status: 400 });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'DECLINED' }
        });

        return NextResponse.json({
            success: true,
            message: 'Booking declined.',
            booking: updatedBooking
        });

    } catch (error) {
        console.error('Booking Decline Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
