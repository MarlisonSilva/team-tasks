"use client";
import { Project } from "@/app/prisma-db";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableProject from "@/components/Tables/TableMyProjects";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ProjectList() {
    const [myProjects, setMyProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchUserNames = async () => {
            // Busca os projetos criados pelo usuário
            const responseMyProjects = await fetch('/api/project/list/by_me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            
            const jsonRes = await responseMyProjects.json();
            console.log(jsonRes);
            setMyProjects(jsonRes.projects);
        };
        fetchUserNames();
    }, []);
    if (myProjects == null || myProjects.length == 0) {
        return (<>
            <h1>Projetos</h1>
            <Link type="button" href={`/projects/c`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Novo Projeto
            </Link>

            <p>Nenhum projeto encontrado</p>
        </>);

    }
    const titles = ["Nome", "Descrição", "Criado por"];
    return (
        <div>
            <Breadcrumb pageName="Projetos" />
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <Link type="button" href={`/projects/c`}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-3"
                    >
                        Novo Projeto
                    </Link>
                </div>
                <TableProject titles={titles} data={myProjects}></TableProject>
            </div>
        </div>
    );
}

