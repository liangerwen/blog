"use client";

import { ThemeType, THEME_KEY } from "@/src/constants/theme";
import { useCookie } from "@/src/hooks/use-cookie";
import { ReactNode, createContext, useContext, useLayoutEffect } from "react";

const ThemeContext = createContext<{
  theme?: ThemeType;
  setTheme?: (theme: ThemeType) => void;
}>({});

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggle = () => {
    setTheme?.(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT);
  };

  return {
    theme,
    setTheme,
    toggle,
  };
};

interface ThemeProviderProps {
  children?: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useCookie(THEME_KEY, ThemeType.LIGHT);

  useLayoutEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
