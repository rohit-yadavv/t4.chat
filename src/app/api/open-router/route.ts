import { NextRequest, NextResponse } from "next/server";
import { auth, unstable_update as update } from "@/auth";
import { codeVerifier } from "@/lib/code-challenge";
import { updateOpenRouterApiKey } from "@/action/user.action";
import { encrypt } from "@/lib/secure-pwd";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code is missing" }, { status: 400 });
  }

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/auth/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        code_verifier: codeVerifier,
        code_challenge_method: "S256",
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to get key" }, { status: 500 });
    }

    const { key } = await response.json();
    await updateOpenRouterApiKey(encrypt(key));

    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
