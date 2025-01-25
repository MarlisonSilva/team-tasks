import { getProjects } from "@/app/prisma-db";
import { Project } from "@/app/prisma-db";

export default async function ProjectList() {
    const projects: Project[] = await getProjects();
    return (
        <div>
            <h1>Projetos</h1>
            <ul className="space-y-4 p-4">
                {projects.map((project: Project) => (
                    <li key={project.id} className="bg-gray-100 p-4">
                        <a href={`/projects/${project.id}`}>Projeto: {project.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}