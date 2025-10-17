"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
// import { toggleBlogVisibility } from "lib";

const AdminBlogTble = ({ data }: any) => {
  return (
    <div className="mt-6 max-w-6xl w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Author </TableHead>
            <TableHead>Date </TableHead>
            <TableHead className="text-right">Category</TableHead>
            {/* <TableHead className="text-right">Visible</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  href={`/admin/blogs/${item.slug}`}
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>
                {dayjs(JSON.parse(item.date)).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell className="text-right">{item.blogCategory}</TableCell>
              {/* <TableVisible item={item} /> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBlogTble;

function TableVisible({ item }: any) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(item.isVisible);

  async function handleToggleVisible(id: any, isVisible: any) {
    setLoading(true);
    // await toggleBlogVisibility(id, !isVisible);
    setIsVisible(!isVisible);
    setLoading(false);
  }
  return (
    <TableCell className="text-right">
      <div
        onClick={() => handleToggleVisible(item.id, item.isVisible)}
        className="ml-auto w-fit cursor-pointer"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : isVisible ? (
          <Eye size={20} />
        ) : (
          <EyeOff size={20} />
        )}
      </div>
    </TableCell>
  );
}
