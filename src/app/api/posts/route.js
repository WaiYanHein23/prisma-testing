import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const getAllPost = await prisma.post.findMany();
  return NextResponse.json(getAllPost);
}

export async function POST(request) {
  const data = await request.json();

  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      published: data.published ?? false,
    },
  });

  return NextResponse.json({ message: "Post created successfully", newPost });
}
