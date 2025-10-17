import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String },
  metaDescription: { type: String },
  blogCategory: { type: String },
  image: { type: String },
  tags: [{ type: String }],
  date: { type: String },

  data: { type: String },
  userImage: { type: String },
  userName: { type: String },
  slug: { type: String, unique: true },
  isVisible: { type: Boolean, default: true },
});

const blogFormSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String },
  number: { type: String },
  refrenceBlogLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export const BlogForm =
  mongoose.models.BlogForm || mongoose.model("BlogForm", blogFormSchema);
