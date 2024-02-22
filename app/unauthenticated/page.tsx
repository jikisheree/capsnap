import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/signin"}>Click here to login...</Link>
    </main>
  );
};

export default page;
