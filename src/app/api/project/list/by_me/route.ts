import {  getProjectsByCreatedById } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const user = await getTokenDataServer(req);
        const projects = await getProjectsByCreatedById(user.id);

        return NextResponse.json({ message: 'Sucesso', projects }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao exibir projetos' }, { status: 500 });
    }
}
