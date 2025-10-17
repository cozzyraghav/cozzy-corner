"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// import { insertBlog, updateBlogByID } from "lib";
import { UploadImage } from "./bannerImage";
import { blogUser } from "@/const/blogConst";
import Input from "./input";
import Textarea from "./textarea";
import { SelectUser } from "./selectUser";
import { SelectBlogCategories } from "./selectedBlogCategory";

const TiptapEditor = ({ data }: any) => {
  const [title, setTitle] = useState(data?.title || "");
  const [metaDescription, setMetaDescription] = useState(
    data?.metaDescription || ""
  );
  const [blogCategory, setBlogCategory] = useState(data?.blogCategory || "");
  const [user, setUser] = useState(
    data ? blogUser.find((item: any) => item.name === data.userName) : ""
  );
  const [imageLink, setImageLink] = useState(data?.image || "");
  const [tagList, setTagList] = useState(data?.tags || []);
  const [blogDate, setBlogDate] = useState(
    data?.date ? JSON.parse(data.date) : new Date()
  );
  // const [blogDate, setBlogDate] = useState(new Date());
  const [imageSrc, setImageSrc] = useState(data?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // @ts-ignore
        heading: true,
        // @ts-ignore
        bulletList: true,
        // @ts-ignore
        orderedList: true,
        // @ts-ignore
        listItem: true,
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: data?.data || "<p>Hello World! 🌎️</p>",
  });

  const [savedHtml, setSavedHtml] = useState("");

  // const handleSave = async () => {
  //   setLoading(true);
  //   if (editor) {
  //     const html = editor.getHTML();
  //     setSavedHtml(html);

  //     if (data?.slug) {
  //       const response = await updateBlogByID({
  //         title,
  //         metaDescription,
  //         blogCategory,
  //         image: imageLink,
  //         tags: tagList,
  //         date: blogDate,
  //         data: html,
  //         userImage: user.image,
  //         userName: user.name,
  //         slug: data?.slug,
  //       });
  //       if (response) {
  //         toast("blog Sved.");
  //       } else {
  //         toast("ERROR");
  //       }
  //     } else {
  //       const response = await insertBlog({
  //         title,
  //         metaDescription,
  //         blogCategory,
  //         image: imageLink,
  //         tags: tagList,
  //         date: blogDate,
  //         data: html,
  //         userImage: user.image,
  //         userName: user.name,
  //       });
  //       showNoti(response);
  //     }
  //   }
  //   setLoading(false);
  // };

  // function showNoti(response: any) {
  //   if (response) {
  //     toast("blog Sved.");

  //     setTitle("");
  //     setMetaDescription("");
  //     setBlogCategory("");
  //     setImageLink("");
  //     setTagList([]);
  //     setBlogDate(new Date());
  //     setUser("");
  //     setImageSrc(null);
  //     setImageFile(null);
  //     editor.commands.clearContent();
  //   } else {
  //     toast("ERROR");
  //   }
  // }

  if (!editor) return null;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <Toaster />
      <Input
        title={"Blog Title"}
        placeholder="Enter Blog Title"
        className="mb-4"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <div className="mb-3 flex gap-4">
        <UploadImage image={imageLink} setImage={setImageLink} />
        {/* <InputTagList value={tagList} setList={setTagList} /> */}
      </div>
      <Textarea
        title={"Blog meta description"}
        placeholder="Enter Blog Meta Description"
        className="mb-4"
        value={metaDescription}
        onChange={(e: any) => setMetaDescription(e.target.value)}
      />

      <div className="flex w-full flex-col gap-6 sm:flex-row">
        <SelectBlogCategories value={blogCategory} onChange={setBlogCategory} />
        <SelectUser value={user} onChange={setUser} />
        {/* <TitleDatepicker
          value={blogDate}
          onChange={setBlogDate}
          title={"Published Date"}
          className={"mb-4"}
        /> */}
      </div>
      {/* date and category */}

      <div className="my-6 flex flex-wrap gap-2 rounded-lg bg-muted p-2">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          {/* <Heading className="h-4 w-4" /> */}
          <span className="ml-1 text-xs">H1</span>
        </Toggle>

        <Toggle
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          {/* <Heading className="h-4 w-4" /> */}
          <span className="ml-1 text-xs">H2</span>
        </Toggle>

        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("link")}
          onPressedChange={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          onPressedChange={() => {
            const url = window.prompt("Enter YouTube URL");
            if (url) {
              editor
                .chain()
                .focus()
                .setYoutubeVideo({
                  src: url,
                })
                .run();
            }
          }}
        >
          <span className="text-xs">YT</span>
        </Toggle>

        <Toggle
          onPressedChange={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
          }}
        >
          <span className="text-xs">Table</span>
        </Toggle>
        <Button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          Add Column
        </Button>
        <Button onClick={() => editor.chain().focus().addRowAfter().run()}>
          Add Row
        </Button>
        <Button onClick={() => editor.chain().focus().deleteTable().run()}>
          Delete Table
        </Button>
      </div>

      <div className="mb-4 rounded-md border-2 bg-white p-1">
        <EditorContent className="[&>*]:focus:outline-none" editor={editor} />
      </div>

      {/* <Button
        //  disabled={loading}
        onClick={handleSave}
      >
        Save
      </Button> */}

      {savedHtml && (
        <div className="prose tiptap mt-4 pt-4">
          <h3 className="mb-2 font-semibold">Preview (Saved HTML):</h3>
          <div
            className="space-y-2 break-all"
            dangerouslySetInnerHTML={{ __html: savedHtml }}
          />
        </div>
      )}
    </div>
  );
};

export default TiptapEditor;
