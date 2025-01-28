import { getCommentById } from '@/app/prisma-db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    if(!id || typeof id !== 'number') {
        return NextResponse.json({ error: 'Inválido.' }, { status: 400 });
    }
    try {
        const comment = await getCommentById(id);

        return NextResponse.json({ message: 'Sucesso', comment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar comentário' }, { status: 500 });
    }
}
