import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch { /* A theme should work when storage is unavailable. */ }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#fafafa");
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Optional persistence. */ }
  }, [theme]);

  return { theme, toggleTheme: () => setTheme(value => value === "dark" ? "light" : "dark") };
};
