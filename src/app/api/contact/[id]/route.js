import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        // Check if message exists
        const existingMessage = await prisma.contactMessage.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingMessage) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        await prisma.contactMessage.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Delete message error:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { read } = body;

        // Check if message exists
        const existingMessage = await prisma.contactMessage.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingMessage) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        const updatedMessage = await prisma.contactMessage.update({
            where: { id: parseInt(id) },
            data: { read }
        });

        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.error('Update message error:', error);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}