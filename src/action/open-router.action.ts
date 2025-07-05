"use server";
import { auth } from "@/auth";
import { updateOpenRouterApiKey } from "./user.action";
import { redirect } from "next/navigation";
import { codeVerifier } from "@/lib/code-challenge";
import { getUser } from "./user.action";
import connectDB from "@/config/db";
import { decrypt } from "@/lib/secure-pwd";

export const connectToOpenRouter = async (code: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    const response = await fetch("https://openrouter.ai/api/v1/auth/keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        code_verifier: codeVerifier,
        code_challenge_method: "S256",
      }),
    });
    if (response.ok) {
      const { key } = await response.json();
      await updateOpenRouterApiKey(key);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  redirect("/");
};

export const getCredit = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    await connectDB();
    const user = await getUser();
    if (!user.data) {
      return {
        data: null,
        error: user.error,
      };
    }
    const apiKey = decrypt(user?.data?.openRouterApiKey as string);

    const url = "https://openrouter.ai/api/v1/credits";
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return {
      data: data?.data || null,
      error: data?.error || null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
