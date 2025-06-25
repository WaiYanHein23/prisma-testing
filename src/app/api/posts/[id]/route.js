import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, context) {
  const postId = parseInt(context.params.id);
  const data = await request.json();

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? false,
      },
    });

    return NextResponse.json({ message: "Post updated successfully", post });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function GET(request, context) {
  const postId = parseInt(context.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  const postId = parseInt(context.params.id);

  try {
    const post = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "Post deleted successfully", post },
      { status: 200 }
    );
  } catch (error) {
    // If post doesn't exist, Prisma will throw an error
    if (
      error.code === "P2025" ||
      error.message?.includes("Record to delete does not exist")
    ) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
