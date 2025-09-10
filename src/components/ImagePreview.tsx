"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function ImagePreview({
  src,
  alt = "preview",
  width = 300,
  height = 300,
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className=" shadow-md h-full w-full object-cover hover:opacity-60 cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            {/* Close Button */}
            <button
              className="absolute -top-4 -right-4 text-white hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Enlarged Image */}
            <Image
              src={src}
              alt={alt}
              width={900}
              height={900}
              className=" shadow-2xl mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
