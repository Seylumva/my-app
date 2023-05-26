import { prisma } from "@/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateTodo = async () => {
  async function handleSubmit(data: FormData) {
    "use server";
    const user = await currentUser();
    const author = user.id;
    const title = data.get("title")?.valueOf();
    const content = data.get("content")?.valueOf();

    if (typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid input");
    }
    if (typeof content !== "string" || content.length === 0) {
      throw new Error("Invalid input");
    }

    await prisma.todo.create({
      data: {
        title,
        content,
        author,
      },
    });
    redirect("/");
  }

  return (
    <form className="flex flex-col gap-4 w-96" action={handleSubmit}>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="title">Title</label>
        <input className="text-slate-800" type="text" name="title" id="title" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="content">Content</label>
        <input
          className="text-slate-800"
          type="text"
          name="content"
          id="content"
        />
      </div>
      <button className="px-3 py-2 bg-blue-800 text-slate-50">Add</button>
    </form>
  );
};

export default CreateTodo;
