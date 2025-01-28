import { getTaskById, updateTask } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        const { id, name, description, status } = await req.json();
        if (!id || !name || !description || !status) {
            return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
        }

        const user = await getTokenDataServer(req);
        const project = await prisma.project.findFirst({
            where: {
                id: (await getTaskById(id)).projectId,
                createdById: user.id,
            },
        });
        
        if (!project) {
            return NextResponse.json({ error: `Você não tem permissão para alterar este tarefa` }, { status: 403 });
        }

        const task = await updateTask(id, { name, description, status });

        return NextResponse.json(
            { message: 'Tarefa alterada com sucesso', task },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erro no servidor:', error);
        return NextResponse.json(
            { error: 'Erro ao alterar tarefa', details: error.message },
            { status: 500 }
        );
    }
}
