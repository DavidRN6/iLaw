import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

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
    <div className="w-full bg-primary dark:bg-darkSecondary border border-secondary/20 rounded-lg p-3 text-secondary">
      <p className="text-sm font-semibold mb-3 text-secondary/70">Theme</p>

      <div className="flex flex-col gap-2">
        {/* Light Mode Option */}
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            theme === "light"
              ? "bg-secondary/20 text-secondary"
              : "hover:bg-secondary/10 text-secondary/60"
          }`}
        >
          <MdOutlineLightMode className="text-xl" />
          <span>Light</span>
        </button>

        {/* Dark Mode Option */}
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            theme === "dark"
              ? "bg-secondary/20 text-secondary"
              : "hover:bg-secondary/10 text-secondary/60"
          }`}
        >
          <IoMoon className="text-xl" />
          <span>Dark</span>
        </button>
      </div>
    </div>
  );
};

export default ToggleTheme;
