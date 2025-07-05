"use client";
import React from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const Logout = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = async () => {
    await signOut({ redirectTo: "/auth" });
  };
  return (
    <div className="w-fit h-fit overflow-hidden" onClick={handleLogout}>
      {children}
    </div>
  );
};

export default Logout;
