import Link from "next/link";

export const metadata = {
    title: "Tasks"
}

export default function Tasks() {
    const taskId = 1;
    return (<>
        <h1>Tasks</h1>
        <h2>
            <Link href={`/tasks/${taskId}`}>Tarefa { taskId }</Link>
        </h2>
    </>);
}