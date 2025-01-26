import { createProject, getProjects } from "@/app/prisma-db";
import { Project } from "@/app/prisma-db";
import Link from "next/link";

type Props = {
    params: Promise<{ name: string, description: string, createdById: number }>;
};

export default async function CreateProject({ params }: Props) {

    async function handleAction(event: Event) {
        await createProject(await params);

    }
    
    return (
        <div>
            <h1>Novo Projeto</h1>
            <CreateProjectForm />
        </div>
    );
}

export async function CreateProjectForm() {
    return (<>
        <form>
            <div>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" />
            </div>
            <div>
                <label htmlFor="description">Descrição</label>
                <textarea id="description" name="description" />
            </div>
            <button type="submit">Salvar</button>
        </form>
    </>);
}