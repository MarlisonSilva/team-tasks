"use client";
import { usePathname } from "next/navigation";

export default function NotFoundComponent() {
    const pathname = usePathname();
    const taskId = pathname.split("/").pop();

    return (<div>
        <h1>Tarefa {taskId} não encontrada</h1>
        <p>Desculpe, mas a tarefa inserida não foi encontrada!</p>
    </div>);
}