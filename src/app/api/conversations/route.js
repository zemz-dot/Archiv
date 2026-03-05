import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                participants: true,
                messages: {
                    orderBy: {
                        timestamp: 'desc'
                    },
                    take: 1
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return NextResponse.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { participantIds } = await request.json();

        if (!participantIds || participantIds.length < 2) {
            return NextResponse.json({ error: 'At least two participants are required' }, { status: 400 });
        }

        // Check if conversation already exists
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                AND: participantIds.map(id => ({
                    participants: {
                        some: { id }
                    }
                }))
            }
        });

        if (existingConversation) {
            return NextResponse.json(existingConversation);
        }

        const conversation = await prisma.conversation.create({
            data: {
                participants: {
                    connect: participantIds.map(id => ({ id }))
                }
            },
            include: {
                participants: true
            }
        });

        return NextResponse.json(conversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
