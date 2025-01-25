import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link href="/profile">Perfil</Link>
            <Link href="/tasks">Tarefas</Link>
        </>
    );
}