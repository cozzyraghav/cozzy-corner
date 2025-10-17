"use client";

import {
  Facebook,
  FacebookIcon,
  Linkedin,
  LinkedinIcon,
  Twitter,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export const TableOfContents = ({ slug }: any) => {
  const [activeId, setActiveId] = useState<any>(null);
  const [headings, setHeadings] = useState<any>([]);

  useEffect(() => {
    const content = document.querySelector(".tiptap");
    if (!content) return;

    const headingElements = Array.from(content.querySelectorAll("h1, h2, h3"));

    const extractedHeadings = headingElements.map((heading: any) => {
      const id =
        heading.id || heading.innerText.toLowerCase().replace(/\s+/g, "-");
      heading.id = id;
      return {
        id,
        text: heading.innerText,
        level: parseInt(heading.tagName.replace("H", ""), 10),
      };
    });

    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 1.0 }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full rounded-xl bg-gray-100 p-4 shadow-md">
        <h3 className="mb-2 text-lg font-semibold">Table of Context</h3>
        <ul className="space-y-2 text-sm">
          {headings.map(({ id, text, level }: any) => (
            <li
              key={id}
              className={`pl-${(level - 1) * 4} ${
                activeId === id
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              <a href={`#${id}`} className="hover:underline">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <a
            target="_blank"
            href={`https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=https://avtechnosys.com/blog/${slug}`}
          >
            <Linkedin className="duration-200 hover:scale-110" size={30} />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=https://avtechnosys.com/blog/${slug}`}
          >
            <Facebook className="duration-200 hover:scale-110" size={30} />
          </a>
          <a
            target="_blank"
            href={`https://x.com/intent/post?original_referer=https://avtechnosys.com/blog/${slug}&url=https://avtechnosys.com/blog/${slug}`}
          >
            <Twitter className="duration-200 hover:scale-110" size={30} />
          </a>
        </div>
        <p className="mt-2">Share this article</p>
      </div> */}
    </div>
  );
};
