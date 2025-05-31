import Hero from "@/components/hero";
import Tasks from "@/components/Tasks";
import { fetchTasks } from "@/lib/actions/taskActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { totaltasks, tasks } = await fetchTasks({
    page: page ? +page : undefined,
  });
  const session = await getSession();
  console.log("%c", "color: green; font-weight: bold;", { session });

  return (
    <main>
      <Hero />
      <Tasks
        tasks={tasks}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totaltasks / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}