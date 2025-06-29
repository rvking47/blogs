import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {

    title: { type: String, required: true },

    content: { type: String, required: true }, // HTML content

    slug: { type: String, required: true, unique: true }, // SEO-friendly slug

    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

  },

  { timestamps: true }

);

const blogAdd=new mongoose.model("blog", PostSchema);

export default blogAdd;