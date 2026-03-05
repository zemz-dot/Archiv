import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Extract deep filtering parameters
        const size = searchParams.get('size');
        const brand = searchParams.get('brand');
        const category = searchParams.get('category');
        // For geospatial search (Proximity)
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        const radiusMiles = searchParams.get('radius') || 10;

        // Build the Prisma 'where' clause dynamically
        const whereClause = {
            isActive: true,
        };

        if (size) whereClause.size = { equals: size, mode: 'insensitive' };
        if (brand) whereClause.brand = { equals: brand, mode: 'insensitive' };
        if (category) whereClause.category = { equals: category, mode: 'insensitive' };

        // Standard relational filtering
        let listings = [];

        if (lat && lng) {
            // Geospatial Query using Prisma Raw Query (mocked for structural demonstration)
            // Utilizing PostGIS ST_DWithin to find listings in the neighborhood
            /*
            listings = await prisma.$queryRaw`
                SELECT "Listing".*, 
                ST_Distance(
                    ST_MakePoint(CAST("User"."longitude" AS FLOAT), CAST("User"."latitude" AS FLOAT)), 
                    ST_MakePoint(${parseFloat(lng)}, ${parseFloat(lat)})
                ) as distance
                FROM "Listing"
                JOIN "User" ON "Listing"."lenderId" = "User"."id"
                WHERE "Listing"."isActive" = true
                AND "Listing"."size" = COALESCE(${size}, "Listing"."size")
                AND "Listing"."brand" = COALESCE(${brand}, "Listing"."brand")
                AND ST_DWithin(
                    ST_MakePoint(CAST("User"."longitude" AS FLOAT), CAST("User"."latitude" AS FLOAT))::geography,
                    ST_MakePoint(${parseFloat(lng)}, ${parseFloat(lat)})::geography,
                    ${radiusMiles * 1609.34} -- miles to meters
                )
                ORDER BY distance ASC
                LIMIT 50;
            `;
            */
            console.log("Executing Geospatial PostGIS Query structurally...");
        } else {
            // Standard ORM query if location is not provided
            /*
            listings = await prisma.listing.findMany({
                where: whereClause,
                include: {
                    lender: {
                        select: { id: true, firstName: true, aggregateRating: true }
                    }
                },
                take: 50,
                orderBy: { createdAt: 'desc' }
            });
            */
            console.log("Executing Standard Relational Query structurally...");
        }

        return NextResponse.json({
            success: true,
            count: listings.length,
            listings
        }, { status: 200 });

    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
