import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export type Project = {
    id: number;
    name: string;
    description: string;
    createdById: number;
}

const seedProjects = async () => {
    const count = await prisma.project.count();
    if (count === 0) {
        await prisma.project.createMany({
            data: [
                { name: 'Projeto 1', description: 'Descrição do projeto 1', createdById: 1 },
                { name: 'Projeto 2', description: 'Descrição do projeto 2', createdById: 1 },
                { name: 'Projeto 3', description: 'Descrição do projeto 3', createdById: 1 },
            ],
        });
    }
};

seedProjects();

export async function getProjects() {
    return prisma.project.findMany();
}

export async function getProjectById(id: number) {
    return prisma.project.findUnique({
        where: { id },
    });
}

export async function createProject(data: { name: string; description: string; createdById: number }) {
    return prisma.project.create({
        data,
    });
}

export async function updateProject(id: number, data: { name: string; description: string }) {
    return prisma.project.update({
        where: { id },
        data,
    });
}

export async function deleteProject(id: number) {
    return prisma.project.delete({
        where: { id },
    });
}