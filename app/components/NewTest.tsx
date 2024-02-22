"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const NewTest = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title } = Object.fromEntries(new FormData(e.currentTarget));

    await fetch("http://localhost:3000/api/test", {
      method: "post",
      body: JSON.stringify({ title }),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
    </form>
  );
};

export default NewTest;
