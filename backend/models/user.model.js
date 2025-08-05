import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "superadmin"],
      default: "user",
    },

    bankName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    gender: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    pollingUnit: { type: String, required: true },
    phone: { type: String, required: true },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
