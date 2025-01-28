import { createComment } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { text, taskId } = await req.json();

    if (!text|| !taskId) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }


    try {
        const user = await getTokenDataServer(req);

        // Cria o comentário
        const project = await createComment({ text, taskId, authorId: user.id });

        return NextResponse.json({ message: 'Comentário criado com sucesso', project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar comentário' }, { status: 500 });
    }
}
