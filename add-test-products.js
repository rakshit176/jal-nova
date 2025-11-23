// Add test products to demonstrate horizontal scrolling
const products = [
    {
        name: 'Jalnova Mineral 500ml',
        description: 'Pure mineral water in convenient 500ml bottle. Perfect for daily hydration.',
        price: 25.00,
        stock: 200
    },
    {
        name: 'Jalnova Sports 750ml',
        description: 'Ergonomic sports bottle with electrolyte-infused mineral water.',
        price: 45.00,
        stock: 150
    },
    {
        name: 'Jalnova Family 2L',
        description: 'Large family size bottle with premium mineral water. Great value pack.',
        price: 80.00,
        stock: 100
    },
    {
        name: 'Jalnova Kids 300ml',
        description: 'Child-friendly bottle with fun designs. Naturally filtered mineral water.',
        price: 20.00,
        stock: 180
    },
    {
        name: 'Jalnova Glass 350ml',
        description: 'Premium mineral water in elegant glass bottle. Perfect for dining.',
        price: 60.00,
        stock: 120
    },
    {
        name: 'Jalnova Sparkling 500ml',
        description: 'Naturally carbonated mineral water with refreshing bubbles.',
        price: 35.00,
        stock: 90
    },
    {
        name: 'Jalnova Eco 1L',
        description: 'Environmentally friendly bottle made from recycled materials.',
        price: 50.00,
        stock: 140
    },
    {
        name: 'Jalnova pH+ 500ml',
        description: 'Alkaline mineral water with added minerals for optimal health.',
        price: 30.00,
        stock: 110
    }
];

console.log('Test Products for Horizontal Scrolling:');
console.log('='.repeat(50));
products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ${product.description}`);
    console.log(`   Price: ₹${product.price.toFixed(2)} | Stock: ${product.stock}`);
    console.log('');
});

console.log('✅ These products will create beautiful horizontal scrolling!');