import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerAddress, quantity, productId } = body;

        if (!productId || !quantity) {
            return NextResponse.json({ error: 'Missing product or quantity' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const totalAmount = product.price * parseInt(quantity);

        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerAddress,
                totalAmount,
                items: {
                    create: {
                        productId: product.id,
                        quantity: parseInt(quantity),
                    },
                },
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
