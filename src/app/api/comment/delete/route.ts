import { deleteComment } from '@/app/prisma-db';
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

        // Verifica se o usuário é o criador do comentário
        const commentTest = await prisma.comment.findFirst({
            where: {
                id: id,
                authorId: user.id,
            },
        });

        if (!commentTest) {
            return NextResponse.json({ error: `Você não tem permissão para remover este comentário` }, { status: 403 });
        }

        // Deleta o comentário
        const comment = await deleteComment(id);

        return NextResponse.json(
            { message: 'Comentário alterado com sucesso', comment },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Erro ao alterar comentário', details: error.message },
            { status: 500 }
        );
    }
}
