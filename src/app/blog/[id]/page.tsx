import dayjs from "dayjs";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { QueryForm } from "./queryForm";
import { TableOfContents } from "./tableOfContext";
// import { getBlogBySlug } from "lib";
import { blogCategories } from "@/const/blogCategories";

export async function generateMetadata(
  { params, searchParams }: any,
  parent: any
) {
  const slug = (await params).id;
  // const [post] = await getBlogBySlug(slug);
  let post: any;

  return {
    title: {
      absolute: post?.title || "Roamify Planners",
    },
    description: post?.metaDescription,
    keywords: post?.tags,
    publisher: post?.userName,
    alternates: {
      canonical: `https://www.roamifyplanners.in/blog//${slug}/`,
    },
    openGraph: {
      title: post?.title,
      description: post?.metaDescription,
      url: `https://www.roamifyplanners.in/blog//${slug}/`,
      siteName: "Roamify Planners",
      type: "website",
      locale: "en_IN",
    },
  };
}

const Page = async ({ params }: any) => {
  const slug = (await params).id;
  // const [blogData] = await getBlogBySlug(slug);
  let blogData: any;

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto mt-12 grid max-w-screen-2xl grid-cols-12 gap-6 px-4">
        <div className="sticky top-24 col-span-3 hidden h-fit lg:block">
          <TableOfContents slug={slug} />
        </div>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
          <div className="flex w-fit items-center gap-1">
            <Link className="cursor-pointer hover:underline" href={"/"}>
              <p>Home</p>
            </Link>
            <ChevronRightIcon size={20} />
            <Link className="cursor-pointer hover:underline" href={"/blog"}>
              <p>Blog</p>
            </Link>
            <ChevronRightIcon size={20} />
            <p>{getBlogCategory(blogData?.blogCategory || "")}</p>
          </div>
          <h1 className="text-3xl font-medium sm:text-4xl">{blogData.title}</h1>
          <p className="text-xl sm:text-2xl">{blogData.metaDescription}</p>
          <img
            src={blogData.image}
            className="h-auto w-full object-contain"
            alt=""
          />

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 items-center gap-4">
              {/* <Image
                height={64}
                width={64}
                src={blogData.userImage || ""}
                className="rounded-full"
                alt=""
              /> */}
              <div className="flex flex-col justify-center gap-1">
                <span className="text-xl font-semibold">
                  {blogData.userName}
                </span>
                <span>
                  {dayjs(JSON.parse(blogData.date)).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
            <p className="hidden text-2xl font-semibold sm:block">
              {getBlogCategory(blogData.blogCategory)}{" "}
            </p>
          </div>

          <div
            className="tiptap space-y-2"
            dangerouslySetInnerHTML={{ __html: blogData.data }}
          />
        </div>
        <div className="col-span-12 w-full lg:col-span-3">
          <QueryForm slug={slug} />
        </div>
      </div>
      {/* <div className="mt-24 h-16 bg-gradient-to-b from-white to-gray-200"></div> */}
      {/* <div className="mt-12 w-full bg-gray-100 px-4 py-12">
        <div className="mx-auto max-w-7xl text-black">
          <div className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <p className="mb-2 text-3xl font-semibold uppercase">
                Our Latest Blogs
              </p>
              <p className="text-xl text-gray-600">
                Get the most recent information on trends, technology, and
                development insights.
              </p>
            </div>
            <Link
              href={"/blog"}
              className="flex h-fit w-fit cursor-pointer items-center gap-2 rounded bg-yellow-500 px-6 py-3 font-medium text-white duration-200 hover:bg-yellow-600"
            >
              <p>View All Blogs</p>
              <ArrowRightIcon size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedBlogs?.map((blog, idx) => {
              return <BlogCard key={idx} blog={blog} />;
            })}
          </div>
        </div>
      </div> */}
      <div className=" h-24"></div>
    </div>
  );
};

export default Page;

function getBlogCategory(blogCategorySlug: any) {
  return blogCategories.find((item) => item.value === blogCategorySlug)?.label;
}

function BlogCard({ blog }: any) {
  function formatDateToDDMMYYYY() {
    return dayjs(JSON.parse(blog.date)).format("DD-MM-YYYY");
  }

  return (
    <div key={blog.id} className="relative mb-4 flex flex-col gap-2">
      <Link
        href={`/blog/${blog?.slug}`}
        className="relative h-auto w-full sm:h-56 sm:w-auto"
      >
        <img
          className="h-auto w-full rounded-xl object-cover sm:h-full sm:w-auto"
          src={blog.image}
          alt={blog.title}
        />
      </Link>
      <div className="flex gap-2 text-sm text-gray-600">
        <p className="">{blog.userName}</p>
        <p className=" ">{formatDateToDDMMYYYY()}</p>
      </div>
      <Link
        href={`/blog/${blog?.slug}`}
        className="line-clamp-2 text-lg font-semibold hover:underline"
      >
        {blog.title}
      </Link>
      <p className="line-clamp-2 text-gray-600">{blog.metaDescription}</p>
    </div>
  );
}
