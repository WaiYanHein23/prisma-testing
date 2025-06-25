"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PostDetail() {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);
        } else {
          setError(data.error || "Failed to load post");
        }
      } catch (err) {
        setError("An error occurred while fetching the post.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  return (
    <div className="flex flex-col justify-center items-center pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white shadow-lg p-6 rounded-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-500" size={28} />
            Post Detail
          </h1>
          <Link
            href="/posts"
            className="flex items-center gap-1 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-blue-500" size={30} />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : post ? (
          <>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-800 mb-4 whitespace-pre-line">
              {post.content}
            </p>
            <p
              className={`text-sm font-medium ${
                post.published ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {post.published ? "Published" : "Draft"}
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-center">Post not found.</p>
        )}
      </motion.div>
    </div>
  );
}
