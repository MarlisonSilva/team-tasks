import { getProjects } from "@/app/prisma-db";
import { Project } from "@/app/prisma-db";
import Link from "next/link";

export default async function ProjectList() {
    const projects: Project[] = await getProjects();
    if (projects == null || projects.length == 0) {
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
    return (
        <div>
            <h1>Projetos</h1>
            <ul className="space-y-4 p-4">
                {projects.map((project: Project) => (
                    <li key={project.id} className="bg-gray-100 p-4">
                        <Link href={`/projects/${project.id}`}>Projeto: {project.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}