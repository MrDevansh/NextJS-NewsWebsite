"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { CalendarDays, Tag, User } from "lucide-react";

export default function NewsList({ selectedCategory = "होम" }) {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true); // <- NEW

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      try {
        setLoading(true); // <- Start loader
        const res = await fetch("/api/news");
        const data = await res.json();
        if (isMounted) setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        if (isMounted) setNews([]);
      } finally {
        if (isMounted) setLoading(false); // <- Stop loader
      }
    };
    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedNews ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNews]);

  const formatDate = useCallback(
    (date) =>
      new Date(date).toLocaleDateString("hi-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const filtered = useMemo(() => {
    return news.filter((item) =>
      selectedCategory === "होम" || selectedCategory === "सभी"
        ? true
        : item.category === selectedCategory
    );
  }, [news, selectedCategory]);

  return (
    <>
      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300 bg-white/70 dark:bg-[#1f1f1f]/70 rounded-lg p-6 sm:p-8 text-center shadow-lg font-semibold text-lg mt-10 border dark:border-[#333]">
          कोई समाचार उपलब्ध नहीं है
          {selectedCategory && selectedCategory !== "सभी"
            ? ` "${selectedCategory}" श्रेणी में`
            : ""}
          .
        </div>
      ) : (
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
                <button
                  onClick={() => setSelectedNews(item)}
                  className="mt-auto self-start px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition duration-200 text-sm font-medium"
                >
                  और पढ़ें →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4">
          <div className="relative w-full max-w-3xl max-h-[95vh] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 z-10 text-white bg-red-600 hover:bg-red-700 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xl shadow"
              aria-label="Close"
            >
              &times;
            </button>

            <img
              src={selectedNews.thumbnail || "/placeholder.jpg"}
              alt={selectedNews.title}
              className="w-full h-48 sm:h-60 object-contain border-b dark:border-[#333]"
            />

            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-snug">
                {selectedNews.title}
              </h2>

              <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-x-3 gap-y-2 mb-5 items-center">
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(selectedNews.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {selectedNews.category}
                </span>
                <span className="flex items-center gap-2 italic">
                  <User className="w-4 h-4" />
                  {selectedNews.author || "लेखक अज्ञात"}
                </span>
              </div>

              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
