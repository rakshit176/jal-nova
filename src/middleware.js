import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect admin API routes
    if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/login') {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Authorization required' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];

        // Simple token validation (in production, use proper JWT verification)
        try {
            const decoded = Buffer.from(token, 'base64').toString('ascii');
            const [username] = decoded.split(':');

            if (username !== 'admin') {
                return NextResponse.json(
                    { error: 'Invalid token' },
                    { status: 401 }
                );
            }
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid token format' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/admin/:path*'
};