"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link";

export default function RealtimePosts({ serverPosts }: { serverPosts: any[] }) {
  const [posts, setPosts] = useState(serverPosts);
  const supabase = createClientComponentClient<any>();

  useEffect(() => {
    setPosts(serverPosts);
  }, [serverPosts]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkout_detail" },
        (payload) => setPosts((posts) => [...posts, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setPosts, posts]);

  return (
    <>
      {posts.map((post) => (
        <div key={post.checkout_id}>
          <p>{post.product_id}</p>
        </div>
      ))}
    </>
  );
}
