import React from "react";

// import { getBlogBySlug } from "lib";
// import TiptapEditor from "@/components/Editro";

const Page = async (context: any) => {
  const slug = context.params.slug;
  // const [blogData] = await getBlogBySlug(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28">
      {/* <TiptapEditor data={blogData} /> */}
    </div>
  );
};

export default Page;
