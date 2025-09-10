import React from "react";
import ImagePreview from "./ImagePreview";
import { convertS3ToImageKit } from "@/helper/imagekit";

const ReviewCard = ({ reviewItem }: any) => {
  return (
    <div
      key={reviewItem.id}
      className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:border-neutral-700 transition-all duration-300"
    >
      <p className="text-gray-100 text-sm leading-relaxed mb-3 line-clamp-4">
        “{reviewItem.message}”
      </p>

      {reviewItem.images && reviewItem.images.filter(Boolean).length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {reviewItem.images
            .filter((img: string) => img && img.trim() !== "")
            .slice(0, 3)
            .map((imgSrc: string, imgIdx: number) => (
              <ImagePreview
                key={imgIdx}
                src={convertS3ToImageKit(imgSrc)}
                alt={`${reviewItem.name}-image-${imgIdx}`}
                width={250}
                height={180}
              />
            ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-yellow-400 font-medium">
          ⭐ {reviewItem.ratting}
        </span>
        <span className="text-gray-400 text-sm italic">
          – {reviewItem.name}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
