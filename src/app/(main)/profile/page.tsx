"use client";
import { getTokenTest } from '@/app/utils/auth';
import { NextRequest } from 'next/server';
interface User {
    id: number,
    email: string,
    iat: number,
    exp: number
}

import { useEffect, useState } from 'react';

export default function Profile(req: NextRequest) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            console.log("get token data");
            const userData: User | null = await getTokenTest();
            setUser(userData);
        }
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Bem-vindo, {user?.email || 'Usuário'}!</h1>
            <p>Esta é uma página protegida.</p>
        </div>
    );
}