import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
    try {
        const { conversationId, senderId, receiverId, content } = await request.json();

        if (!senderId || !receiverId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let actualConversationId = conversationId;

        // If conversationId is not provided, try to find or create one
        if (!actualConversationId) {
            const existingConversation = await prisma.conversation.findFirst({
                where: {
                    AND: [
                        { participants: { some: { id: senderId } } },
                        { participants: { some: { id: receiverId } } }
                    ]
                }
            });

            if (existingConversation) {
                actualConversationId = existingConversation.id;
            } else {
                const newConversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            connect: [
                                { id: senderId },
                                { id: receiverId }
                            ]
                        }
                    }
                });
                actualConversationId = newConversation.id;
            }
        }

        const message = await prisma.message.create({
            data: {
                content,
                senderId,
                receiverId,
                conversationId: actualConversationId
            }
        });

        // Update conversation's updatedAt timestamp
        await prisma.conversation.update({
            where: { id: actualConversationId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
