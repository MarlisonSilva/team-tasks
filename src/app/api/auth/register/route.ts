import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    try {
        // Verifica se o email já existe
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Usuário já registrado' }, { status: 400 });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        // Gera o token JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // Retorna o token e os dados do usuário
        return NextResponse.json({ message: 'Usuário criado com sucesso', token, user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
    }
}
