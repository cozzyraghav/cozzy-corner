import BlogCard from "@/components/blogCard";
import HeroBG from "@/components/tripHero";
import dayjs from "dayjs";
// import { getAdminBlogData } from "lib";
import React from "react";

export const metadata = {
  title: "Blogs - Roamify Planners",
  description:
    "Discover expert travel tips, destination guides, and curated experiences with Roamify Planners to make every journey unforgettable.",
  alternates: {
    canonical: "https://www.roamifyplanners.in/blog/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blogs - Roamify Planners",
    description:
      "Discover expert travel tips, destination guides, and curated experiences with Roamify Planners to make every journey unforgettable.",
    url: "https://www.roamifyplanners.in/blog/",
    siteName: "Roamify Planners",
    type: "website",
  },
};

const Page = async () => {
  // const blogsData = await getAdminBlogData();
  let blogsData;
  return (
    <div>
      <HeroBG text="Blog" img={"./blog-bg.jpg"} />
      <div className=" flex flex-col justify-center items-center px-4  py-12">
        <h1 className=" text-2xl text-center md:text-4xl font-medium   mb-6">
          Explore the World: Travel Tips, Stories, and Adventures
        </h1>
        <p className="md:text-lg  text-gray-600 max-w-2xl text-center mb-8">
          Discover exciting travel destinations, expert tips, and unforgettable
          experiences. Our blog takes you on a journey around the globe,
          offering valuable insights on everything from hidden gems to must-see
          landmarks.
        </p>
      </div>
      <Blogs blogsData={blogsData} />
    </div>
  );
};

export default Page;

function Blogs({ blogsData }: any) {
  return (
    <div className=" w-full max-w-7xl px-4 mx-auto pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* {blogsData?.map((item: any) => {
        return (
          <BlogCard
            key={item.id}
            image={item.image}
            date={formatToDateOnly(item.date)}
            heading={item.title}
            description={item.metaDescription}
            blogLink={`/blog/${item.slug}`}
          />
        );
      })} */}
    </div>
  );
}

// export function formatToDateOnly(isoString: any) {
//   if (!isoString || typeof isoString !== "string") return null;

//   const date = dayjs(isoString);
//   return date.isValid() ? date.format("DD-MM-YYYY") : null;
// }
