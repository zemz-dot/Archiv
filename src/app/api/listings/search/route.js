import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q');
        const size = searchParams.get('size');
        const brand = searchParams.get('brand');
        const category = searchParams.get('category');

        const whereClause = {
            isActive: true,
        };

        if (q) {
            whereClause.OR = [
                { brand: { contains: q, mode: 'insensitive' } },
                { category: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
            ];
        }

        if (size) whereClause.size = { equals: size, mode: 'insensitive' };
        if (brand) whereClause.brand = { equals: brand, mode: 'insensitive' };
        if (category) whereClause.category = { equals: category, mode: 'insensitive' };

        const listings = await prisma.listing.findMany({
            where: whereClause,
            include: {
                lender: {
                    select: { id: true, firstName: true, aggregateRating: true, name: true }
                }
            },
            take: 20,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            count: listings.length,
            listings: listings.map(l => ({
                id: l.id,
                brand: l.brand,
                name: `${l.brand} ${l.category}`,
                price: Number(l.dailyRentalPrice),
                img: l.imageUrls[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200',
                lenderName: l.lender.firstName || l.lender.name || 'Lender',
                rating: l.lender.aggregateRating || 5.0
            }))
        }, { status: 200 });

    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
