import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: String,
    phone: String,
    role: {
      type: String,
      enum: ["customer", "worker", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
