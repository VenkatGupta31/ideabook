import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

export default async function IdeaList() {
  const ideas = await db.topic.findMany();

  const renderedIdeas = ideas.map((idea) => {
    return (
      <div key={idea.id}>
        <Link href={paths.topicShow(idea.slug)}>
          <Chip color="warning" variant="shadow">
            {idea.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-column flex-wrap gap-2">{renderedIdeas}</div>
  );
}
