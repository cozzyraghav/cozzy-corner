import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogUser } from "@/const/blogConst";

export function SelectUser({ value, onChange }: any) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="font-medium">User</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mb-4 w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {/* {blogUser.map((item) => {
              return (
                <SelectItem key={item.value} value={item}>
                  {item.name}
                </SelectItem>
              );
            })} */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
