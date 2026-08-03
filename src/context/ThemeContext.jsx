/* @refresh skip */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("blog-theme");
    if (savedTheme) return savedTheme;

    // Fallback to systemic environment media preferences
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [themeChangeKey, setThemeChangeKey] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;

    // Explicitly configure data attributes for your custom Tailwind selectors
    root.setAttribute("data-theme", theme);
    localStorage.setItem("blog-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    // Increment key for components that need to re-render
    setThemeChangeKey((prev) => prev + 1);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggleTheme, themeChangeKey }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
