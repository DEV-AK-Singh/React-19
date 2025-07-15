import React from "react";
import { Moon, Sun } from "react-feather";

export default function ThemeToggler({ theme, toggleTheme }) {
  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? <Moon className="text-black"/> : <Sun className="text-yellow-400"/>}
    </button>
  );
}
