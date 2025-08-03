"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { CalendarDays, Tag, User } from "lucide-react";
import Link from "next/link";
import { Facebook, Share2, MessageCircle } from "lucide-react";

export default function NewsList({ selectedCategory = "होम" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news");
        const data = await res.json();
        if (isMounted) setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (isMounted) setNews([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = useCallback(
    (date) =>
      new Date(date).toLocaleDateString("hi-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const filtered = useMemo(
    () =>
      news.filter((item) =>
        selectedCategory === "होम" || selectedCategory === "सभी"
          ? true
          : item.category === selectedCategory
      ),
    [news, selectedCategory]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-300 bg-white/70 dark:bg-[#1f1f1f]/70 rounded-lg p-6 sm:p-8 text-center shadow-lg font-semibold text-lg mt-10 border dark:border-[#333]">
        कोई समाचार उपलब्ध नहीं है
        {selectedCategory && selectedCategory !== "सभी"
          ? ` "${selectedCategory}" श्रेणी में`
          : ""}
        .
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 sm:mt-6">
      {filtered.map((item) => (
        <div
          key={item._id}
          className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl shadow-md hover:shadow-lg transition duration-200 flex flex-col overflow-hidden"
        >
          <img
            loading="lazy"
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-x-3 gap-y-2 mb-3 items-center">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {formatDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {item.category}
              </span>
              <span className="flex items-center gap-1 italic">
                <User className="w-4 h-4" />
                {item.author || "लेखक अज्ञात"}
              </span>
            </div>
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
              {item.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
              {item.content?.slice(0, 150)}...
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href={`/news/${item._id}`}
                className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition duration-200 text-sm font-medium"
              >
                और पढ़ें →
              </Link>

              {/* Share Buttons */}
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/news/${item._id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  title="Facebook पर शेयर करें"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${item.title} – पढ़ें: ${process.env.NEXT_PUBLIC_SITE_URL}/news/${item._id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                  title="WhatsApp पर शेयर करें"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
