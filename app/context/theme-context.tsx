import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvidee = ({ children }: any) => {
  const [theme, setTheme] = useState("retro");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted;
  }, []);
};
