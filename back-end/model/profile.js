import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String },
    PhoneNumber: { type: Number },
    password: { type: String },
    token: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
