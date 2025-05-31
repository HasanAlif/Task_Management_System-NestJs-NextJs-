import { fetchTaskById } from "@/lib/actions/taskActions";
import Image from "next/image";
import DOMPurify from "dompurify";
import SanitizedContent from "@/app/blog/[slug]/[id]/_components/SanitizedContent";
import { getSession } from "@/lib/session";

type Props = {
  params: {
    id: string;
  };
};
const TaskPage = async ({ params }: Props) => {
  const taskId = (await params).id;
  const task = await fetchTaskById(+taskId);
  const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{task.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {task.author.name} | {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          src={task.thumbnail ?? "/no-image.png"}
          alt={task.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <SanitizedContent content={task.content} />
    </main>
  );
};

export default TaskPage;