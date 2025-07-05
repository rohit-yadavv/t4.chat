import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Sun } from "lucide-react";
import ThemeToggle from "../global-cmp/theme-toggle";
import Link from "next/link";
import Logout from "../logout";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Link href="/">
      <Button variant="ghost" className="t">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chat
      </Button>
      </Link>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Logout>
          <Button variant="ghost" className="">
            Sign out
          </Button>
        </Logout>
      </div>
    </div>
  );
};

export default Header;
