"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddNewsForm from "@/components/AddNewsForm";
import AddReporterForm from "@/components/AddReporterForm";
import { Newspaper, UserPlus, ArrowLeftCircle } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    if (activeTab === "news") {
      fetchNews();
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xl mb-8 text-center">
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
            🛠️ Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Select an option to manage your content
          </p>
        </div>

        {/* Back to Home */}
        <Link href="/" className="flex justify-center mb-6">
          <button className="flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-md hover:scale-105 transition-transform">
            <ArrowLeftCircle size={20} />
            Back to Home
          </button>
        </Link>

        {/* Toggle Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("news")}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow ${
              activeTab === "news"
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white scale-105"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Newspaper size={18} />
            Add News
          </button>

          <button
            onClick={() => setActiveTab("reporter")}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow ${
              activeTab === "reporter"
                ? "bg-gradient-to-r from-purple-500 to-rose-500 text-white scale-105"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <UserPlus size={18} />
            Add Reporter
          </button>
        </div>

        {/* Form Display */}
        <div>
          {activeTab === "news" && <AddNewsForm onNewsAdded={fetchNews} />}
          {activeTab === "reporter" && <AddReporterForm />}
        </div>
      </div>
    </main>
  );
}
