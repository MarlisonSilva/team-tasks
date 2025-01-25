import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ taskId: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { taskId } = await params;
    return {
        title: `Tarefa ${ taskId }`
    };
}

export default async function Task({ params }: Props ) {
    const { taskId } = await params;
    if (parseInt(taskId) > 1000) {
        redirect("/tasks");
    }
    return (<h1>Task { taskId }</h1>);
}