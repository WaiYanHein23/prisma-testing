"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { Pencil, Trash2, FileText, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [postToUpdate, setPostToUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleEditClick = (post) => {
    setPostToUpdate(post);
    setIsUpdating(true);
    reset({
      title: post.title,
      content: post.content,
      published: post.published,
    });
  };

  const onSubmit = async (data) => {
    if (postToUpdate && isUpdating) {
      try {
        const res = await fetch(`/api/posts/${postToUpdate.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const updated = await res.json();
        if (res.ok) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postToUpdate.id ? updated.post : post
            )
          );
          toast.success("Post updated successfully");
          reset({ title: "", content: "", published: false });
          setIsUpdating(false);
          setPostToUpdate(null);
        } else {
          toast.error(updated.error || "Failed to update post");
        }
      } catch (error) {
        toast.error("Something went wrong while updating");
      }
    } else {
      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const newPost = await res.json();
        if (res.ok) {
          setPosts((prevPosts) => [...prevPosts, newPost]);
          toast.success("Post created successfully");
          reset();
        } else {
          toast.error(newPost.error || "Failed to create post");
        }
      } catch (error) {
        toast.error("Something went wrong while creating");
      }
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.error || "Failed to delete post");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6 pt-24 px-4">
      <div className="flex justify-between w-full max-w-3xl items-center">
        <Link
          href="/"
          className="text-white bg-gray-700 p-2 px-4 rounded hover:bg-gray-600 flex items-center gap-1"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          All Posts ({posts.length})
        </h1>
      </div>

      {/* Post List */}
      {posts.length > 0 ? (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl space-y-4"
        >
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white border shadow rounded-lg flex flex-col sm:flex-row sm:items-center justify-between p-4 transition hover:shadow-md"
            >
              <p className="text-lg font-medium text-gray-800">{post.title}</p>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <Link
                  href={`/posts/${post.id}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <FileText size={16} />
                  Detail
                </Link>
                <button
                  onClick={() => handleEditClick(post)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-gray-500 text-center">No Posts Available</p>
      )}

      {/* Create / Update Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-4 max-w-2xl w-full bg-white border p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-center">
          {isUpdating ? "Update Post" : "Create Post"}
        </h2>

        <input
          {...register("title", { required: "Title is required" })}
          className="border border-gray-300 p-3 rounded"
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <textarea
          {...register("content", { required: "Content is required" })}
          className="border border-gray-300 p-3 rounded"
          rows={4}
          placeholder="Write content..."
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("published")} />
          Published
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-700 hover:bg-blue-600 text-white p-2 rounded flex justify-center items-center gap-1"
          >
            <Check size={18} />
            {isUpdating ? "Update" : "Create"}
          </button>
          {isUpdating && (
            <button
              type="button"
              onClick={() => {
                setIsUpdating(false);
                setPostToUpdate(null);
                reset({ title: "", content: "", published: false });
              }}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.form>
    </div>
  );
}
