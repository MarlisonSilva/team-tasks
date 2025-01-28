import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '@/app/prisma-db';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    try {
        // Verifica se o usuário existe
        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 400 });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Senha incorreta' }, { status: 400 });
        }

        // Gera o token JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // Retorna o token e os dados do usuário
        return NextResponse.json({ message: 'Login bem-sucedido', token, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 });
    }
}