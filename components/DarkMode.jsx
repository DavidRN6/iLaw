import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement; // html element

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative text-secondary/70 text-2xl flex items-center justify-center">
      <MdOutlineLightMode
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`absolute cursor-pointer transition-all duration-300 z-10
        ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
      />

      <IoMoon
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`absolute cursor-pointer transition-all duration-300
        ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default DarkMode;
