import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = session.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { verificationStatus: true, email: true, firstName: true, name: true }
        });

        // 1. Get all listings owned by the user
        const listings = await prisma.listing.findMany({
            where: { lenderId: userId },
            include: {
                bookings: {
                    where: { status: 'COMPLETED' }
                }
            }
        });

        // 2. Get rentals (where user is RENTER)
        const orders = await prisma.booking.findMany({
            where: { renterId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                listing: {
                    select: { brand: true, category: true, imageUrls: true, lender: { select: { firstName: true, name: true } } }
                }
            }
        });

        // 3. Get pending requests (where user is LENDER)
        const requests = await prisma.booking.findMany({
            where: {
                listing: { lenderId: userId },
                status: 'PENDING'
            },
            include: {
                renter: { select: { firstName: true, image: true, name: true, email: true } },
                listing: { select: { brand: true, category: true, imageUrls: true } }
            }
        });

        // 4. Get active rentals (where user is LENDER)
        const activeRentalsData = await prisma.booking.findMany({
            where: {
                listing: { lenderId: userId },
                status: 'APPROVED'
            },
            include: {
                renter: { select: { firstName: true, image: true, name: true } },
                listing: { select: { brand: true, category: true, imageUrls: true } }
            }
        });

        // 5. Get Reviews Received
        const reviewsReceived = await prisma.review.findMany({
            where: { revieweeId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                reviewer: { select: { firstName: true, name: true, image: true } },
                booking: { include: { listing: { select: { brand: true } } } }
            }
        });

        // 5. Calculate KPIs
        const totalEarnings = listings.reduce((acc, l) => {
            const listingEarn = l.bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
            return acc + listingEarn;
        }, 0);

        // 6. Get Recent Activity
        const activity = [
            ...requests.map(r => ({
                id: r.id,
                type: 'request',
                text: `New booking request from ${r.renter.firstName || r.renter.name || r.renter.email} for ${r.listing.brand}`,
                time: 'Recent',
                icon: '📩'
            })),
            ...activeRentalsData.map(a => ({
                id: a.id,
                type: 'active',
                text: `${a.listing.brand} rental is currently active with ${a.renter.firstName || a.renter.name}`,
                time: 'Now',
                icon: '📦'
            }))
        ].slice(0, 10);

        return NextResponse.json({
            stats: {
                totalEarnings,
                activeRentals: activeRentalsData.length,
                totalItems: listings.length,
                pendingPayout: totalEarnings * 0.9 // 90% goes to lender usually
            },
            user: {
                verificationStatus: user.verificationStatus,
                name: user.firstName || user.name || user.email
            },
            activity,
            items: listings.map(l => ({
                id: l.id,
                name: `${l.brand} ${l.category}`,
                img: l.imageUrls[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400',
                price: Number(l.dailyRentalPrice),
                category: l.category,
                status: l.isActive ? 'active' : 'paused',
                earn: l.bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0),
                rentals: l.bookings.length,
                occupancy: l.bookings.length > 0 ? 85 : 0 // Simulation
            })),
            requests: requests.map(r => ({
                id: r.id,
                item: `${r.listing.brand} ${r.listing.category}`,
                img: r.listing.imageUrls[0],
                renter: r.renter.firstName || r.renter.name || r.renter.email,
                avatar: r.renter.image || `https://i.pravatar.cc/150?u=${r.renterId}`,
                dates: `${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()}`,
                earn: Number(r.totalPrice),
                status: 'pending'
            })),
            rentals: activeRentalsData.map(a => ({
                id: a.id,
                item: `${a.listing.brand} ${a.listing.category}`,
                img: a.listing.imageUrls[0],
                renter: a.renter.firstName || a.renter.name,
                avatar: a.renter.image || `https://i.pravatar.cc/150?u=${a.renterId}`,
                end: new Date(a.endDate).toLocaleDateString(),
                days: Math.ceil((new Date(a.endDate) - new Date(a.startDate)) / (1000 * 60 * 60 * 24)),
                earn: Number(a.totalPrice),
                status: 'active'
            })),
            orders: orders.map(o => ({
                id: o.id,
                item: `${o.listing.brand} ${o.listing.category}`,
                lender: o.listing.lender.firstName || o.listing.lender.name || '@lender',
                img: o.listing.imageUrls[0],
                price: Number(o.totalPrice),
                status: o.status === 'APPROVED' ? 'active' : o.status === 'COMPLETED' ? 'completed' : 'pending',
                date: new Date(o.createdAt).toLocaleDateString(),
                reviewed: false // Should check review table if it existed
            })),
            reviews: reviewsReceived.map(r => ({
                id: r.id,
                user: r.reviewer.firstName || r.reviewer.name || 'Anonymous',
                avatar: r.reviewer.image || `https://i.pravatar.cc/150?u=${r.reviewerId}`,
                rating: r.rating,
                item: r.booking.listing.brand,
                comment: r.comment,
                date: new Date(r.createdAt).toLocaleDateString()
            }))
        });
    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}
