"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

const navLinks = [
    { href: `/projects`, label: 'Projetos' },
    { href: `/profile`, label: 'Perfil' },
    { href: `/login`, label: 'Entrar' },
];

export default function NavBar() {
    const pathname = usePathname();
    return (
        <nav>
            {navLinks.map(({ href, label }) => {
                const isActive = pathname === href || (pathname.startsWith(href) && href !== '/');
                return (

                    <Link key={label} href={href} className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}>{label}</Link>

                );
            })}
        </nav>
    );
}