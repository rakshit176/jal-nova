import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, image, imageData, thumbnail, stock } = body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                image: image || "/images/bottle-500ml.png",
                imageData: imageData || null,
                thumbnail: thumbnail || null,
                stock: parseInt(stock),
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Product creation error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const productId = parseInt(id);

        // First, delete all order items associated with this product
        await prisma.orderItem.deleteMany({
            where: { productId: productId },
        });

        // Then delete the product
        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({
            error: 'Failed to delete product',
            details: error.message
        }, { status: 500 });
    }
}
