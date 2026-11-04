"use client";

import * as React from "react";

const ThemeContext = React.createContext(undefined);

const THEME_STORAGE_KEY = "kindora-theme";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState("light");

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    const savedTheme =
      storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setThemeState(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}