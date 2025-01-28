import { createProject } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, description } = await req.json();

    if (!name || !description) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }


    try {
        const user = await getTokenDataServer(req);

        // Cria o projeto
        const project = await createProject({ name, description, createdById: user.id });

        return NextResponse.json({ message: 'Projeto criado com sucesso', project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar projeto' }, { status: 500 });
    }
}
