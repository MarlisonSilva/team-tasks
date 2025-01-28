import { getCommentById, updateComment } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    try {
        // Consome o corpo da requisição
        const { id, text } = await req.json();

        // Validação dos campos obrigatórios
        if (!id || !text ) {
            return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
        }

        // Recupera dados do usuário autenticado
        const user = await getTokenDataServer(req);

        // Verifica se o usuário é o criador do projeto dono da tarefa
        const commentTest = await prisma.comment.findFirst({
            where: {
                id: id,
                authorId: user.id,
            },
        });

        if (!commentTest) {
            return NextResponse.json({ error: `Você não tem permissão para alterar este comentário` }, { status: 403 });
        }

        // Atualiza o tarefa
        const comment = await updateComment(id, { text });

        return NextResponse.json(
            { message: 'Comentário alterado com sucesso', comment },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erro no servidor:', error);
        return NextResponse.json(
            { error: 'Erro ao alterar comentário', details: error.message },
            { status: 500 }
        );
    }
}
