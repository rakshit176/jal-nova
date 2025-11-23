import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, email, role } = body;

        // Check if employee exists
        const existingEmployee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingEmployee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        const updatedEmployee = await prisma.employee.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                role,
            },
        });

        return NextResponse.json(updatedEmployee);
    } catch (error) {
        console.error('Update employee error:', error);
        return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        // Check if employee exists
        const existingEmployee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingEmployee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        await prisma.employee.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Delete employee error:', error);
        return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
    }
}