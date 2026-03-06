import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { conversationId, content } = await req.json();

        if (!conversationId || !content) {
            return NextResponse.json({ error: 'Missing conversationId or content' }, { status: 400 });
        }

        // 1. Verify user is part of the conversation
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { participants: true }
        });

        if (!conversation || !conversation.participants.some(p => p.id === session.user.id)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Create message
        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId: session.user.id,
                content
            }
        });

        // 3. Update conversation lastMessageAt
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error('Message POST Error:', error);
        return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get('conversationId');

        if (!conversationId) {
            return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 });
        }

        const messages = await prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
            include: { sender: { select: { firstName: true, image: true } } }
        });

        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}
