import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export type Project = {
    id: number;
    name: string;
    description: string;
    createdById: number;
    createdBy?: User;
}

export async function getProjects() {
    return await prisma.project.findMany();
}

export async function getProjectsByCreatedById(createdById: number) {
    return await prisma.project.findMany({
        where: { createdById },
        include: { createdBy: true }, // Inclui o usuário que criou o projeto
    });
}

export async function getProjectById(id: number) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { createdBy: true }, // Inclui o usuário que criou o projeto
    });
    if (!project) {
        throw new Error('Projeto não encontrado');
    }
    return project;
}

export async function createProject(data: Prisma.ProjectUncheckedCreateInput) {
    return await prisma.project.create({
        data,
    });
}

export async function updateProject(id: number, data: Prisma.ProjectUncheckedUpdateInput) {
    return await prisma.project.update({
        where: { id },
        data,
    });
}

export async function deleteProject(id: number) {
    return await prisma.project.delete({
        where: { id },
    });
}

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    projects?: Project[];
    tasks?: Task[];
    comments?: Comment[];
}

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUserById(id: number) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export async function createUser(data: Prisma.UserUncheckedCreateInput) {
    return await prisma.user.create({
        data,
    });
}

export async function updateUser(id: number, data: { name: string, email: string }) {
    return await prisma.user.update({
        where: { id },
        data,
    });
}

export async function deleteUser(id: number) {
    return await prisma.user.delete({
        where: { id },
    });
}

export type Task = {
    id: number;
    name: string;
    description: string;
    status: string;
    projectId: number;
    assignedTo?: number;
    project?: Project;
    comments?: Comment[];
}

export async function getTasks() {
    return await prisma.task.findMany();
}

export async function getTaskById(id: number) {
    const task = await prisma.task.findUnique({
        where: { id },
        include: { comments: true, project: true }, // Inclui os comentários que contém
    });
    if (!task) {
        throw new Error('Tarefa não encontrada');
    }
    return task;
}

export async function getTasksByProject(projectId: number) {
    const tasks = await prisma.task.findMany({
        where: { projectId },
        include: { comments: true }, // Inclui os comentários que contém
    });
    if (!tasks) {
        throw new Error('Tarefas não encontradas');
    }
    return tasks;
}

export async function createTask(data: Prisma.TaskUncheckedCreateInput) {
    return await prisma.task.create({
        data,
    });
}

export async function updateTask(id: number, data: Prisma.TaskUncheckedUpdateInput) {
    return await prisma.task.update({
        where: { id },
        data,
    });
}

export async function deleteTask(id: number) {
    return await prisma.task.delete({
        where: { id },
    });
}


export type Comment = {
    id: number;
    text: string;
    taskId: number;
    authorId: number;
    task?: Task;
    author?: User;
}

export async function getComments() {
    return await prisma.comment.findMany();
}

export async function getCommentById(id: number) {
    const task = await prisma.comment.findUnique({
        where: { id },
        include: {  }, // Inclui os comentários que contém
    });
    if (!task) {
        throw new Error('Comentário não encontrado');
    }
    return task;
}

export async function getCommentsByTask(taskId: number) {
    const tasks = await prisma.comment.findMany({
        where: { taskId },
        include: { author: true }, // Inclui os comentários que contém
    });
    if (!tasks) {
        throw new Error('Comentários não encontrados');
    }
    return tasks;
}

export async function createComment(data: Prisma.CommentUncheckedCreateInput) {
    return await prisma.comment.create({
        data,
    });
}

export async function updateComment(id: number, data: Prisma.CommentUncheckedUpdateInput) {
    return await prisma.comment.update({
        where: { id },
        data,
    });
}

export async function deleteComment(id: number) {
    return await prisma.comment.delete({
        where: { id },
    });
}