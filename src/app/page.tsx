import IdeaCreateForm from "@/components/ideas/idea-create-form";
import IdeaList from "@/components/ideas/idea-list";
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top ideas</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border shodow py-3 px-2">
        <IdeaCreateForm />
        <Divider className="my-2" />
        <div className="text-xl m-2 underline">Ideas list:</div>
        <IdeaList />
      </div>
    </div>
  );
}
