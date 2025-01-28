import { createTask } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, description, projectId } = await req.json();

    if (!name || !description || !projectId) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    try {
        const task = await createTask({ name, description, projectId });

        return NextResponse.json({ message: 'Tarefa criada com sucesso', task }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar tarefa' }, { status: 500 });
    }
}
