import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/app/utils/auth';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value || null;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT secret is not definido');
            return NextResponse.redirect(new URL('/login', req.url));
        }

        const decoded = await verifyToken(token, secret);
        // console.log('Token decodificado:', decoded);
        return NextResponse.next();
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/profile/:path*'],
};
