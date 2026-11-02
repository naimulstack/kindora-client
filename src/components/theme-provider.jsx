"use client";

import * as React from "react";

const ThemeContext = React.createContext(undefined);

const THEME_STORAGE_KEY = "kindora-theme";

function getSnapshot() {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Local storage can be unavailable; fall through to the system theme.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot() {
  return "light";
}

function subscribe(callback) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", callback);

  const handleStorage = (event) => {
    if (event.key === THEME_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeProvider({ children }) {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [themeOverride, setThemeOverride] = React.useState(null);

  const activeTheme = themeOverride ?? theme;

  const setTheme = React.useCallback((nextTheme) => {
    const next = nextTheme === "dark" ? "dark" : "light";

    setThemeOverride(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  }, [activeTheme, setTheme]);

  const value = React.useMemo(
    () => ({
      theme: activeTheme,
      isDark: activeTheme === "dark",
      setTheme,
      toggleTheme,
    }),
    [activeTheme, setTheme, toggleTheme]
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
