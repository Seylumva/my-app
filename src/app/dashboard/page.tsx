import { prisma } from "@/db";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
    return null;
  }

  if (user) {
    const tasks = await prisma.todo.findMany({
      where: {
        author: {
          equals: user.id,
        },
      },
    });
    return (
      <div>
        <h2 className="text-3xl mt-4">Tasks</h2>
        <Link href="/dashboard/create-todo">+ Todo</Link>
        <ul className="mt-6">
          {tasks.map((task) => (
            <li key={task.id} className="text-lg text-slate-100">
              {task.title} -{" "}
              <span className="text-sm text-slate-300">{task.content}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Dashboard;
