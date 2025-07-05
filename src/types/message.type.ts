'use server';
import mongoose, { Document } from "mongoose";

export interface MessageType extends Document {
  threadId: string;
  userId: string;
  userQuery: string;
  attachment: string;
  isSearch: boolean;
  aiResponse: [
    {
        content: string;
        model: string;
    }
  ];
  createdAt: Date;
}