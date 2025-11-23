const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'Jalnova Pure 500ml',
            description: 'Perfect for on-the-go hydration. 24 bottles per case.',
            price: 240.00,
            image: '/images/bottle-500ml.png',
            stock: 500,
        },
        {
            name: 'Jalnova Family 1L',
            description: 'Ideal for family dinners. 12 bottles per case.',
            price: 300.00,
            image: '/images/bottle-1l.png',
            stock: 300,
        },
        {
            name: 'Jalnova Dispenser 20L',
            description: 'Large volume for offices and homes. Returnable jar.',
            price: 150.00,
            image: '/images/jar-20l.png',
            stock: 100,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }
    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
