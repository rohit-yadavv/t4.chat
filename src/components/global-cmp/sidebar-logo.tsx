import React from "react";
import { cn } from "@/lib/utils";

const SidebarLogo = ({ className }: { className?: string }) => {
  return (
    <h2
      style={{ fontFamily: "var(--font-berkeley-mono)" }}
      className={cn("text-2xl font-bold", className)}
    >
      T4.Chat
    </h2>
  );
};

export default SidebarLogo;
