import { deleteProject, updateProject } from '@/app/prisma-db';
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
            return NextResponse.json({ error: `Você não tem permissão para remover este projeto` }, { status: 403 });
        }

        const project = await deleteProject(id);

        return NextResponse.json(
            { message: 'Projeto alterado com sucesso', project },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erro no servidor:', error);
        return NextResponse.json(
            { error: 'Erro ao alterar projeto', details: error.message },
            { status: 500 }
        );
    }
}
