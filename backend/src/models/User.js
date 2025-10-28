import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    gender: String,
    interests: [String],
    city: String,
    bio: String,
    profileImage: {
      type: String
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tripsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    tripsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);



