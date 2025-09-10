import mongoose from "mongoose";

const reviewSehema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  ratting: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const ReviewSchema =
  mongoose.models.reviewSehema || mongoose.model("reviewSehema", reviewSehema);
export default ReviewSchema;
