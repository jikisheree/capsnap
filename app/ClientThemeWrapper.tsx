"use client";
import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";

export default function ClientThemeWrapper({ children }: any) {
  return <div data-theme="nord">{children}</div>;
}
