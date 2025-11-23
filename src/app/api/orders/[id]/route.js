import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error('Update order error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
