import Footer from "@/components/footer";
import ImagePreview from "@/components/ImagePreview";
import NavBar from "@/components/navBar";
import ReviewCard from "@/components/ReviewCard";
import connect from "@/dbConfig/dbConfig";
import { convertS3ToImageKit } from "@/helper/imagekit";
import ReviewSchema from "@/Models/reviewModel";
import React from "react";

const Page = async () => {
  connect();

  const reviewsData = await ReviewSchema.find({});
  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviewsData.map((reviewItem, idx) => (
          <ReviewCard key={idx} reviewItem={reviewItem} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
