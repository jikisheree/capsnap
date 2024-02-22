"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Post({ serverPosts }: { serverPosts: any[] }) {
  const [posts, setPosts] = useState(serverPosts);
  const supabase = createClientComponentClient<any>();
  const router = useRouter();

  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkout_detail" },
        (payload) => {
          console.log(payload);
          router.refresh();
          //setPosts((posts) => [...posts, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setPosts, posts]);

  return (
    <>
      {posts.map((post, index: number) => (
        <div key={index}>
          <p>{post.product_id}</p>
        </div>
      ))}
    </>
  );
}
