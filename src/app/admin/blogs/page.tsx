import { Plus } from "lucide-react";
import Link from "next/link";
// import { getAdminBlogData, getBlogFormData } from "lib";
import AdminBlogTble from "@/components/AdminBlogTable";
import AdminBlogFormTable from "@/components/AdminBlogFormData";

const Page = async () => {
  let data: any = [];
  let blogFormData: any = [];

  try {
    [data, blogFormData] = await Promise.all([
      // getAdminBlogData(),
      // getBlogFormData(),
      [],
      [],
    ]);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    // Optional: Show fallback UI or rethrow
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <h2 className="text-2xl font-semibold">Admin</h2>
      <Link
        href="/admin/blogs/new"
        className="ml-auto mt-2 flex w-fit cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 duration-200 hover:bg-gray-100 hover:underline"
      >
        <Plus size={18} />
        New Blog
      </Link>
      <AdminBlogTble data={data} />
      {blogFormData.length > 0 && (
        <>
          <p className="mt-12 text-3xl">Blogs Data</p>
          <AdminBlogFormTable data={blogFormData} />
        </>
      )}
    </div>
  );
};

export default Page;
