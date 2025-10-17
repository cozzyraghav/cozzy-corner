"use client";
import React from "react";

const BlogContent = ({ blogData }: any) => {
  const renderContent = (lines: any) => {
    return lines?.map((line: any, index: any) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-4xl font-bold md:text-5xl">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-3xl font-bold md:text-4xl">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-2xl font-bold md:text-3xl">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-xl font-bold md:text-2xl">
            {line.replace("#### ", "")}
          </h4>
        );
      } else if (line.startsWith("<u>")) {
        return (
          <div key={index} className="underline">
            <p>{line.replace(/<u>/g, "").replace(/<\/u>/g, "")}</p>
          </div>
        );
      } else if (line.startsWith("- ")) {
        return (
          <ul key={index} className="ml-5 list-disc">
            <li>{line.replace("- ", "")}</li>
          </ul>
        );
      } else if (/^\d+\./.test(line)) {
        return (
          <ol key={index} className="ml-5 list-decimal">
            <li>{line.replace(/^\d+\.\s*/, "")}</li>
          </ol>
        );
      } else if (line.startsWith(">")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-500 pl-4 italic"
          >
            {line.replace(">", "")}
          </blockquote>
        );
      } else if (line.startsWith("![") && line.includes("](")) {
        const altText = line.match(/!\[(.*?)\]/)?.[1] || "Image";
        const urlMatch = line.match(/\(([^)]+)\)/);
        const url = urlMatch ? urlMatch[1] : null;
        return (
          <img
            key={index}
            src={url}
            alt={altText}
            className="my-4 max-h-[32rem] max-w-full"
          />
        );
      } else if (line.startsWith("[")) {
        const text = line.match(/\[(.*?)\]/)?.[1];
        const url = line.match(/\((.*?)\)/)?.[1];
        return (
          <a key={index} href={url} className="text-blue-500 hover:underline">
            {text}
          </a>
        );
      }
      //   else if (line.startsWith('```')) {
      //     return (
      //       <div
      //         key={index}
      //         className="my-2 overflow-auto rounded bg-gray-800 p-4 text-white"
      //       >
      //         {/* <p className="bg-transparent">{line.replace('```', '')}</p> */}
      //       </div>
      //     );
      //   }
      else if (/^\*\*(.*?)\*\*/.test(line)) {
        return (
          <p key={index} className="font-bold">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else if (/^_(.*?)_/.test(line)) {
        return (
          <p key={index} className="italic">
            {line.replace(/_/g, "")}
          </p>
        );
      } else if (/^~~(.*?)~~/.test(line)) {
        return (
          <p key={index} className="line-through">
            {line.replace(/~~/g, "")}
          </p>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };
  return (
    <div>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 py-16 text-white md:px-4">
        {renderContent(blogData)}
      </div>
    </div>
  );
};

export default BlogContent;
