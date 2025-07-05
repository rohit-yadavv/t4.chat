import React from "react";
import OpenRouterConnect from "@/components/connect-key/open-router-connect";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) => {
  const code = (await searchParams).code;
  const user = await auth();
  if (!user) {
    return redirect("/auth");
  }
  return (
    <div className=" mt-10 mb-40">
      <OpenRouterConnect code={code} />
    </div>
  );
};

export default page;