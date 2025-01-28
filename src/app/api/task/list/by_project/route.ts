import { getTasksByProject } from '@/app/prisma-db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { projectId } = await req.json();
    
    try {
        const tasks = await getTasksByProject(projectId);
        return NextResponse.json({ message: 'Sucesso', tasks }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao exibir tarefas' }, { status: 500 });
    }
}
