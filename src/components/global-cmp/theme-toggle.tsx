"use client";
import { useTheme } from "next-themes";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "../ui/button";
import DevTooltip from "./dev-tooltip";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <>
      <DevTooltip tipData="Theme">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <FiSun className=" duration-100 animate-in -spin-in fade-in-50 zoom-in-75 theme-btn-sun" />
          ) : (
            <FiMoon className=" duration-100 animate-in spin-in fade-in-50 zoom-in-75 theme-btn-moon" />
          )}
        </Button>
      </DevTooltip>
    </>
  );
};

export default ThemeToggle;
