import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    title: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    images: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isFlagged: { type: Boolean, default: false },
    response: String, // trip creator reply
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);