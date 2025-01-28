import { getUserById } from '@/app/prisma-db';
import { getTokenDataServer } from '@/app/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    try {
        const userData = await getTokenDataServer(req);
        const user = await getUserById(userData.id);
        return NextResponse.json({ message: 'Sucesso', user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 });
    }
}
