import React from "react";
import Profile from "@/components/settings/profile";
import Header from "@/components/settings/header";
import TabNavigation from "@/components/settings/tab-navigation";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if(!session){
    return redirect("/");
  }
  return (
    <div className="md:max-w-7xl md:mx-auto md:p-10 p-4">
      <Header />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:block hidden">
          <Profile />
        </div>
        <div className="flex-1">
          <div className="overflow-x-auto no-scrollbar rounded-md mt-8 md:mt-0 p-0 h-fit">
            <TabNavigation />
          </div>
          <div className="md:mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
