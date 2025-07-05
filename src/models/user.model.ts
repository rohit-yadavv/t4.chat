"use server";
import mongoose, { Schema } from "mongoose";
import { userType } from "@/types/user.type";

const UserSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    t3ChatInfo: {
      username: {
        type: String,
      },
      profession: {
        type: String,
      },
      skills: {
        type: [String],
      },
      additionalInfo: {
        type: String,
      },
    },
    geminiApiKey: {
      type: String,
      default: "",
    },
    models: {
      selected: {
        type: [String],
      },
      favorite: {
        type: [String],
      },
    },
    openRouterApiKey: {
      type: String,
      default: "",
    },
    // apiKeys will implement later
    apiKeys: [
      {
        model: {
          type: String,
        },
        key: {
          type: String,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models?.User || mongoose.model<userType>("User", UserSchema);

export default User;
