"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Tag, User } from "lucide-react";

export default function NewsList({ selectedCategory = "होम" }) {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setNews([]);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    // Freeze scroll when modal is open
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNews]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const filtered = news.filter((item) =>
    selectedCategory === "होम" || selectedCategory === "सभी"
      ? true
      : item.category === selectedCategory
  );

  if (!filtered.length) {
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
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
          >
            <img
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
                className="mt-auto self-start px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-200 text-sm font-medium"
              >
                और पढ़ें →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md backdrop-saturate-150 p-4">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp max-h-[90vh] transition-all duration-300">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-10 text-white bg-red-600 hover:bg-red-700 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg transition"
              aria-label="Close"
            >
              &times;
            </button>

            <img
              src={selectedNews.thumbnail || "/placeholder.jpg"}
              alt={selectedNews.title}
              className="w-full h-60 object-contain sm:rounded-t-3xl"
            />

            <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(90vh-60px)]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-snug">
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
