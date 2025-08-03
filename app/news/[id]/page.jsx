// app/news/[id]/page.jsx

import { notFound } from "next/navigation";
import { CalendarDays, Tag, User, ArrowLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  await connectDB();
  const news = await News.findById(params.id).lean();
  if (!news) return {};

  const description = news.content.slice(0, 160);

  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      images: [
        {
          url: news.thumbnail,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [news.thumbnail],
    },
  };
}

export default async function NewsDetailPage({ params }) {
  await connectDB();
  const news = await News.findById(params.id).lean();
  if (!news) return notFound();

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      {/* Left Ads */}
      <div className="hidden lg:flex flex-col gap-4 w-1/5">
        <AdBox />
        <AdBox />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-[#121212] p-6 rounded-xl shadow-md border dark:border-[#2a2a2a]">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 text-sm w-max"
        >
          <ArrowLeft className="w-4 h-4" />
          पीछे जाएं
        </Link>

        {/* Image */}
        <Image
          src={news.thumbnail}
          alt={news.title}
          width={1200}
          height={600}
          className="w-full h-auto object-cover rounded-lg mb-6"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white leading-snug">
          {news.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-x-3 gap-y-2 mb-6 items-center">
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(news.createdAt).toLocaleDateString("hi-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {news.category}
          </span>
          <span className="flex items-center gap-2 italic">
            <User className="w-4 h-4" />
            {news.author || "लेखक अज्ञात"}
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
          {news.content}
        </p>

        {/* Share Buttons */}
        <div className="mt-6 flex gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              `${process.env.NEXT_PUBLIC_SITE_URL}/news/${news._id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            फेसबुक पर साझा करें
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${news.title} – पढ़ें: ${process.env.NEXT_PUBLIC_SITE_URL}/news/${news._id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            WhatsApp पर शेयर करें
          </a>
        </div>
      </div>

      {/* Right Ads */}
      <div className="hidden lg:flex flex-col gap-4 w-1/5">
        <AdBox />
        <AdBox />
      </div>
    </div>
  );
}

function AdBox() {
  return (
    <div className="w-full h-60 bg-gray-100 dark:bg-[#1f1f1f] border dark:border-[#333] rounded-lg shadow flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
      ADVERTISEMENT
    </div>
  );
}
