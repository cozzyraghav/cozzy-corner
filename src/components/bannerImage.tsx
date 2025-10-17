// import FileUpload from "@/helper/upload";

import { PlusIcon, X } from "lucide-react";
import { useRef, useState } from "react";

export function UploadImage({ image, setImage }: any) {
  const inputRef = useRef<any>(null);
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputImage() {
    inputRef.current.click();
  }

  async function handleImageUploadToS3() {
    let imageLinks = [];
    function getImageName(url: any) {
      // Split the URL by slashes and take the last part
      const parts = url.split("/");
      const lastPart = parts[parts.length - 1];
      // Remove query parameters if they exist
      const imageName = lastPart.split("?")[0];
      return `/blog/${imageName}`;
    }

    const response = await fetch("/api/s3/getImageUploadURL", {
      method: "POST",
      body: JSON.stringify({
        count: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      const responst = await fetch(data[0], {
        method: "PUT",
        body: inputRef.current.files[0],
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      const imageS3Link = getImageName(data[0]);
      imageLinks.push(imageS3Link);
    } else {
      console.error("Error submitting form:", response.statusText);
    }
    setImage(imageLinks[0]);
  }

  return (
    <div className="flex flex-col justify-start items-start gap-1.5">
      <p>Upload Image</p>
      {image ? (
        <div className=" relative">
          <img src={image} className=" h-32 object-contain w-auto" alt="" />
          <X
            className=" bg-white rounded-full border text-red-600 border-red-600 absolute top-1 right-1 cursor-pointer"
            onClick={() => setImage("")}
          />
        </div>
      ) : (
        <div
          className=" size-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer"
          onClick={handleInputImage}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageUploadToS3}
            style={{ display: "none" }}
          />
          {loading ? <p>Loading...</p> : <PlusIcon />}
        </div>
      )}
      {errorMessage && <p className=" text-red-500">{errorMessage}</p>}
    </div>
  );
}
