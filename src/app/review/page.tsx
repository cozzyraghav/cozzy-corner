"use client";
import Footer from "@/components/footer";
import ImagePreview from "@/components/ImagePreview";
import NavBar from "@/components/navBar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { convertS3ToImageKit } from "@/helper/imagekit";
import { LoaderCircle, Plus, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = async () => {
  return (
    <div className=" bg-black min-h-screen text-white">
      <NavBar />
      <ReviewForm />
      <Footer />
    </div>
  );
};

export default Page;

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [s3ImageLink, sets3ImageLink] = useState("");

  const [firstS3Image, setFirstS3Image] = useState("");
  const [secondS3Image, setSecondS3Image] = useState("");
  const [thirdS3Image, setThirdS3Image] = useState("");

  async function handleSubmit(e: any) {
    setLoading(true);
    if (
      !reviewData.name ||
      !reviewData.email ||
      !reviewData.number ||
      !reviewData.message ||
      !star
    ) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/addNewReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: reviewData.name,
          email: reviewData.email,
          number: reviewData.number,
          message: reviewData.message,
          ratting: star,
          images: [firstS3Image, secondS3Image, thirdS3Image],
        }),
      });
      setReviewData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
      setFirstS3Image("");
      setSecondS3Image("");
      setThirdS3Image("");
      setStar(0);
      setSubmitMessage("Review added successfully");
    } catch (error) {
      console.log(error);
      setSubmitMessage("Something went wrong");
    }
    setLoading(false);
  }

  async function handleImageUploadToS3(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    function getImageName(url: string) {
      const parts = url.split("/");
      const lastPart = parts[parts.length - 1];
      return `https://s3.ap-south-1.amazonaws.com/cozzy.corner/allProducts/${lastPart.split("?")[0]}`;
    }

    try {
      // ask backend for 1 signed URL
      const response = await fetch("/api/getImageUploadUrl", {
        method: "POST",
        body: JSON.stringify({ count: 1 }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to get upload URL");

      const data: string[] = await response.json(); // expect 1 signed URL
      const uploadUrl = data[0];

      // upload the single file
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type || "image/jpeg" },
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");

      // get clean S3 URL
      const imageS3Link = getImageName(uploadUrl);
      console.log("The image link: ", imageS3Link);
      return imageS3Link;
      // setImageAdded(true);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  }

  return (
    <div className=" max-w-2xl w-full mx-auto p-4">
      <div className=" rounded-md p-4 ">
        <p className=" w-full my-5 text-center text-2xl font-medium">
          Sumbit your happy review for us
        </p>
        <form className=" flex flex-col gap-8 mt-8">
          <div className=" space-y-1">
            <Label>Name</Label>
            <Input
              value={reviewData.name}
              onChange={(e: any) => {
                setReviewData({ ...reviewData, name: e.target.value });
              }}
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <div className=" space-y-1">
            <Label>Email</Label>
            <Input
              value={reviewData.email}
              onChange={(e: any) => {
                setReviewData({ ...reviewData, email: e.target.value });
              }}
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className=" space-y-1">
            <Label>Number</Label>
            <Input
              value={reviewData.number}
              onChange={(e: any) => {
                setReviewData({ ...reviewData, number: e.target.value });
              }}
              name="number"
              placeholder="Enter your number"
            />
          </div>
          {/* ⭐ Star Rating with Encouragement */}
          <div>
            <p className="mb-2 font-medium">Rate your experience</p>
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    (hoverStar || star) >= i
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverStar(i)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setStar(i)}
                  fill={(hoverStar || star) >= i ? "#facc15" : "none"}
                />
              ))}
            </div>

            {/* Encouragement Message */}
            <div className="mt-2 text-sm text-gray-600 min-h-[1.5rem]">
              {hoverStar === 5 || star === 5 ? (
                <span>⭐ You're awesome! Thanks for the perfect score! 😊</span>
              ) : hoverStar || star ? (
                {
                  1: "😢 Oh no! What went wrong?",
                  2: "😕 Sorry it wasn’t great...",
                  3: "😐 Okay-ish, we’ll do better!",
                  4: "🙂 Almost there!",
                }[hoverStar || star]
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" space-y-1">
            <Label>Message</Label>
            <textarea
              name="message"
              rows={3}
              value={reviewData.message}
              onChange={(e: any) => {
                setReviewData({ ...reviewData, message: e.target.value });
              }}
              className=" w-full border border-gray-600 bg-neutral-800 rounded-md p-1"
              placeholder="Write your message"
            />
          </div>

          <div className=" space-y-1">
            <span>Add Image</span>
            <div className=" w-full gap-5 grid grid-cols-1 md:grid-cols-3">
              {firstS3Image ? (
                <ImagePreview
                  src={convertS3ToImageKit(firstS3Image)}
                  alt="reviewImage"
                />
              ) : (
                <ImageUpload
                  handleImageUploadToS3={handleImageUploadToS3}
                  setFirstS3Image={setFirstS3Image}
                />
              )}
              {secondS3Image ? (
                <ImagePreview
                  src={convertS3ToImageKit(secondS3Image)}
                  alt="reviewImage"
                />
              ) : (
                <ImageUpload
                  handleImageUploadToS3={handleImageUploadToS3}
                  setFirstS3Image={setSecondS3Image}
                />
              )}
              {thirdS3Image ? (
                <ImagePreview
                  src={convertS3ToImageKit(thirdS3Image)}
                  alt="reviewImage"
                />
              ) : (
                <ImageUpload
                  handleImageUploadToS3={handleImageUploadToS3}
                  setFirstS3Image={setThirdS3Image}
                />
              )}
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className=" hover:bg-green-600 bg-green-500"
          >
            Submit
          </Button>
          <p>{submitMessage}</p>
        </form>
      </div>
    </div>
  );
};

function Input(props: any) {
  return (
    <input
      className=" w-full border border-gray-600 bg-neutral-800 rounded-md p-1"
      {...props}
    />
  );
}

function ImageUpload({ handleImageUploadToS3, setFirstS3Image }: any) {
  const [loading, setLoading] = useState(false);
  return (
    <div className=" relative flex items-center justify-center border border-dashed border-gray-600 aspect-[3/2]">
      <input
        type="file"
        onChange={async (e) => {
          setLoading(true);
          const imageLink = await handleImageUploadToS3(e);
          setFirstS3Image(imageLink || "");
          setLoading(false);
        }}
        className=" opacity-0 inset-0 w-full h-full absolute"
      />
      {loading ? (
        <LoaderCircle className="  animate-spin" />
      ) : (
        <Plus className=" " />
      )}
    </div>
  );
}
