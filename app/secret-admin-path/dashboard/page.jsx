"use client";

import { useEffect, useState } from "react";
import AddNewsForm from "@/components/AddNewsForm";

export default function Dashboard() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🔐 <span>Admin Dashboard</span>
      </h1>

      <div className="mb-8">
        <AddNewsForm onNewsAdded={fetchNews} />
      </div>

      <ul className="space-y-6">
        {news.map((item) => (
          <li
            key={item._id}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {item.content}
            </p>

            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt="Thumbnail"
                className="mt-4 w-full max-w-sm rounded-lg border border-gray-200 dark:border-gray-700"
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
