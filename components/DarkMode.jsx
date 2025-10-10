"use client";
import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const DarkMode = () => {
  // نبدأ بـ null علشان نمنع الريندر قبل معرفة الثيم الحقيقي
  const [theme, setTheme] = useState(null);

  // أول useEffect: قراءة الثيم من localStorage بعد تحميل الصفحة
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    }
  }, []);

  // ثاني useEffect: تطبيق الثيم على <html>
  useEffect(() => {
    if (!theme) return; // ما تعملش حاجة لحد ما نعرف الثيم فعلاً

    const element = document.documentElement;

    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // أثناء التحميل الأول (قبل ما نعرف الثيم) منرجعش أي عنصر
  if (!theme) return null;

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
