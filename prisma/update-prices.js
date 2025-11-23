const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePrices() {
    // Update existing products to INR prices
    const updates = [
        { name: 'Jalnova Pure 500ml', newPrice: 240.00 },
        { name: 'Jalnova Family 1L', newPrice: 300.00 },
        { name: 'Jalnova Dispenser 20L', newPrice: 150.00 },
    ];

    for (const update of updates) {
        await prisma.product.updateMany({
            where: { name: update.name },
            data: { price: update.newPrice },
        });
    }

    console.log('Prices updated to INR successfully!');
}

updatePrices()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
