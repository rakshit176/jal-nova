import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, role } = body;

        const employee = await prisma.employee.create({
            data: {
                name,
                email,
                role,
            },
        });

        return NextResponse.json(employee, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const employees = await prisma.employee.findMany();
        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 });
        }

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

