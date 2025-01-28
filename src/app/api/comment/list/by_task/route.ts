import { getCommentsByTask } from '@/app/prisma-db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { taskId } = await req.json();
    
    try {
        const comments = await getCommentsByTask(taskId);
        return NextResponse.json({ message: 'Sucesso', comments }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao exibir comentários' }, { status: 500 });
    }
}
