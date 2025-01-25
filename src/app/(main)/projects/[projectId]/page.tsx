import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getProjectById } from "@/app/prisma-db";
import { Project } from "@/app/prisma-db";

type Props = {
    params: Promise<{ projectId: string }>;
};

async function searchProjectById(id: number): Promise<Project | null> {
    return getProjectById(id);
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { projectId } = await params;
    return {
        title: `Projeto ${ (await searchProjectById(parseInt(projectId)))?.name }`
    };
}

export default async function project({ params }: Props ) {
    const { projectId } = await params;
    const project: Project | null = await searchProjectById(parseInt(projectId));
    if (project === null) {
        redirect("/projects");
    } 
    return (<h1>Projeto: { project?.name }</h1>);
}