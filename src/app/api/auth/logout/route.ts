import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({ message: 'Logout realizado com sucesso' }, { status: 200 });
        response.cookies.set('token', '', { maxAge: -1, path: '/' });
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deslogar' }, { status: 500 });
    }
}
