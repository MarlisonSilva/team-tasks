import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Ou qualquer outro serviço de email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'O email é obrigatório' });
  }

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Gera o token de redefinição de senha
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    // Envia o email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Redefinição de Senha',
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
    });

    res.status(200).json({ message: 'Email de redefinição enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
