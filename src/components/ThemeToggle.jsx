import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle text-accent hover:text-primary transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
