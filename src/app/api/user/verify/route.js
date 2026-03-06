import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { idImageUrl } = await req.json();

        if (!idImageUrl) {
            return NextResponse.json({ error: 'ID image is required' }, { status: 400 });
        }

        // In a real app, you would send this to an ID verification service like Stripe Identity or Persona.
        // For this demo, we'll simulate the "ID_VERIFIED" status.

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                verificationStatus: 'UNDER_REVIEW',
            },
        });

        return NextResponse.json({
            success: true,
            status: updatedUser.verificationStatus,
        });
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
