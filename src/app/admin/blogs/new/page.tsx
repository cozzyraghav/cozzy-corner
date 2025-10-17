"use client";
import TiptapEditor from "@/components/Editro";
import { useEffect, useState } from "react";

const Page = () => {
  const [localStorage, setLocalStorage] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalStorage(window.localStorage);
    }
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28">
      {/* {localStorage?.getItem('token') === process.env.NEXT_PUBLIC_TOKEN ? ( */}
      <TiptapEditor />
      {/* ) : (
        <div>Not logged in</div>
      )} */}
    </div>
  );
};

export default Page;
