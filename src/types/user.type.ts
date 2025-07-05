'use server';
import { Document } from "mongoose";

export interface userType extends Document {
  name: string;
  email: string;
  image: string;
  t3ChatInfo: {
    username: string;
    profession: string;
    skills: string[];
    additionalInfo: string;
  }
  geminiApiKey: string;
  models: {
    selected: string[];
    favorite: string[];
  },
  openRouterApiKey: string;
  // apiKeys will implement later
  apiKeys: {
    model: string;
    key: string;
  },  
  isDeleted: boolean;
}