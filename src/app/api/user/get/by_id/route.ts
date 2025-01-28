import { getTaskById } from '@/app/prisma-db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    if(!id || typeof id !== 'number') {
        return NextResponse.json({ error: 'Inválido.' }, { status: 400 });
    }
    try {
        const project = await getTaskById(id);

        return NextResponse.json({ message: 'Sucesso', project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar tarefa' }, { status: 500 });
    }
}
