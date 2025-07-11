"use client";
import Link from "next/link";
import React from "react";

const page = async () => {
  // const session = await auth();

  // if (!session) {
  //   redirect("/register");
  // }
  return (
    <div className="flex flex-col justify-center items-center pt-24 px-4 background-gradient ">
      <Link href="/posts">Go To Post List</Link>
    </div>
  );
};

export default page;
