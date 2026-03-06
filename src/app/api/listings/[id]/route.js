import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: { id },
            include: {
                lender: {
                    select: {
                        firstName: true,
                        name: true,
                        image: true,
                        email: true
                    }
                }
            }
        });

        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const data = await request.json();

        const listing = await prisma.listing.findUnique({
            where: { id }
        });

        if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        if (listing.lenderId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const updated = await prisma.listing.update({
            where: { id },
            data: {
                brand: data.brand,
                category: data.category,
                description: data.description,
                condition: data.condition,
                color: data.color,
                size: data.size,
                retailPrice: data.retailPrice,
                dailyRentalPrice: data.dailyRentalPrice,
                isActive: data.isActive,
                imageUrls: data.imageUrls
            }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: { id }
        });

        if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        if (listing.lenderId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        await prisma.listing.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
