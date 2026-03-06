import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { status, damageNote } = await request.json();

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { listing: true }
        });

        if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

        // Authorization: Only lender can mark as returned or report damage
        if (booking.listing.lenderId !== session.user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const data = { status };
        // In a real app we might have a damageNote field in the Booking model
        // For now let's just update the status

        const updated = await prisma.booking.update({
            where: { id },
            data
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Booking PATCH Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
