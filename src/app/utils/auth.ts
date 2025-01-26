import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function verifyToken(token: string, secret: string) {
    const [header, payload, signature] = token.split('.');

    // Decodificar Base64
    const encodedPayload = `${header}.${payload}`;
    const decoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        decoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );

    // Verificar assinatura
    const isValid = await crypto.subtle.verify(
        'HMAC',
        key,
        Uint8Array.from(atob(signature.replace(/_/g, '/').replace(/-/g, '+')), (c) => c.charCodeAt(0)),
        decoder.encode(encodedPayload)
    );

    if (!isValid) {
        throw new Error('Token inválido');
    }

    // Retornar o payload decodificado
    return JSON.parse(atob(payload));
}

// export const getTokenData = async (req: NextRequest) => {
//     const token = req.cookies.get('token')?.value || null;
//     if (!token) {
//         return null;
//     }

//     try {
//         const secret = process.env.JWT_SECRET;
//         if (!secret) {
//             console.error('JWT secret is not definido');
//             return null;
//         }

//         const decoded = await verifyToken(token, secret);
//         return decoded;
//     } catch (error) {
//       console.error('Token inválido:', error);
//       return null;
//     }
// }

export const getTokenTest = () => {
    if (typeof window === 'undefined') return null; // Garante que o código roda apenas no lado do cliente

    const token = localStorage.getItem('token');
    if (!token) return null; // Nenhum token encontrado no localStorage

    try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload diretamente no cliente
        return decoded; // Retorna os dados do usuário
    } catch (error) {
        console.error('Token inválido:', error);
        return null;
    }
};
