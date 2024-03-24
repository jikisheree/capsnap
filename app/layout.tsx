import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "./context/supabase-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CapSnap",
  description: "Stock & Selling Manager",
  // icons: {
  //   favicon: "tb/TbCaptureFilled"
  // }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: userSession } = await readUserSession();
  // console.log("user");
  // console.log(userSession);

  // if (!userSession.user) return redirect("/signin");
  // useUserStore.setState({ user: userSession.user });
  // console.log(useUserStore.getState().user);

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
