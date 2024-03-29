import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "./context/supabase-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CapSnap",
  description: "Stock & Selling Manager",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body className={`no-scrollbar ${inter.className}`}>
          <AppWrapper>{children}</AppWrapper>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
