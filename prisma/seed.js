const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Create Users
    const user1 = await prisma.user.upsert({
        where: { email: 'foued@archiv.co' },
        update: {},
        create: {
            email: 'foued@archiv.co',
            passwordHash: 'mock_password_hash', // In real app, this would be BCrypt
            firstName: 'Foued',
            lastName: 'Mensi',
            latitude: 48.8566,
            longitude: 2.3522,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'sarah@archiv.co' },
        update: {},
        create: {
            email: 'sarah@archiv.co',
            passwordHash: 'mock_password_hash',
            firstName: 'Sarah',
            lastName: 'M.',
            latitude: 48.8584,
            longitude: 2.2945,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { email: 'isabelle@archiv.co' },
        update: {},
        create: {
            email: 'isabelle@archiv.co',
            passwordHash: 'mock_password_hash',
            firstName: 'Isabelle',
            lastName: 'R.',
            latitude: 48.8606,
            longitude: 2.3376,
        },
    });

    // Create a conversation between Foued and Sarah
    const conversation = await prisma.conversation.create({
        data: {
            participants: {
                connect: [{ id: user1.id }, { id: user2.id }],
            },
            messages: {
                create: [
                    {
                        content: 'Hi Sarah! I saw your listing for the Jacquemus dress.',
                        senderId: user2.id,
                        receiverId: user1.id,
                    },
                    {
                        content: 'Hey Sarah! Yes, it is still available.',
                        senderId: user1.id,
                        receiverId: user2.id,
                    },
                    {
                        content: 'Is it still available for next week?',
                        senderId: user2.id,
                        receiverId: user1.id,
                    },
                ],
            },
        },
    });

    console.log('Seed complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
