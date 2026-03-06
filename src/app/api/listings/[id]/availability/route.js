import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/listings/[id]/availability
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const blockedDates = await prisma.blockedDate.findMany({
            where: { listingId: id },
            select: { date: true, reason: true }
        });

        return NextResponse.json({ blockedDates });
    } catch (error) {
        console.error('Fetch availability error:', error);
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
}

// POST /api/listings/[id]/availability - Toggle a date block
export async function POST(req, { params }) {
    try { // Added try-catch block for POST
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { date, reason = 'MANUAL' } = await req.json();

        if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });

        // Verify ownership
        const listing = await prisma.listing.findUnique({
            where: { id },
            select: { lenderId: true }
        });

        if (!listing || listing.lenderId !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        // Check if already blocked
        const existing = await prisma.blockedDate.findUnique({
            where: {
                listingId_date: {
                    listingId: id,
                    date: targetDate
                }
            }
        });

        if (existing) {
            // Unblock
            await prisma.blockedDate.delete({
                where: { id: existing.id }
            });
            return NextResponse.json({ status: 'unblocked' });
        } else {
            // Block
            await prisma.blockedDate.create({
                data: {
                    listingId: id,
                    date: targetDate,
                    reason
                }
            });
            return NextResponse.json({ status: 'blocked' });
        }
    } catch (error) {
        console.error('Update availability error:', error);
        return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 });
    }
}
