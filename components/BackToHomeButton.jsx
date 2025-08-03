"use client";

import { useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function BackToHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="fixed top-4 left-4 z-50 flex items-center gap-1 px-3 py-1.5
        bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
        text-xs font-semibold text-white rounded-full shadow-md shadow-pink-300 
        hover:scale-105 hover:shadow-xl transition-all duration-300 
        ring-1 ring-white/70 dark:ring-black/40 backdrop-blur-sm"
    >
      <HomeIcon className="h-4 w-4" />
      होम
    </button>
  );
}
