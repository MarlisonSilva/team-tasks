import { deleteTask } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
        }

        const user = await getTokenDataServer(req);

        const projectTest = await prisma.project.findFirst({
            where: {
                id: id,
                createdById: user.id,
            },
        });

        if (!projectTest) {
            return NextResponse.json({ error: `Você não tem permissão para remover esta tarefa` }, { status: 403 });
        }

        // Deleta o projeto
        const task = await deleteTask(id);

        return NextResponse.json(
            { message: 'Tarefa alterada com sucesso', task },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Erro ao alterar tarefa', details: error.message },
            { status: 500 }
        );
    }
}
