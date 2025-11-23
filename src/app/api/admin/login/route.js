import { NextResponse } from 'next/server';

// In a real application, you'd use environment variables and proper hashing
// For this demo, we'll use a simple hardcoded admin user
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'jalnova123' // You should change this to a strong password
};

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Check credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Create a simple token (in production, use JWT)
            const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

            return NextResponse.json({
                message: 'Login successful',
                token,
                username,
                expiresIn: '24h'
            });
        } else {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}