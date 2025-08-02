"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const categories = [
  "होम",
  "देश",
  "राज्य",
  "संत कबीर नगर",
  "गोरखपुर",
  "बस्ती",
  "राजनीति",
  "क्राइम",
  "संपादकीय",
  "रिपोर्टर",
];

const Header = ({ currentCategory, setCategory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow bg-dark-200 dark:bg-[#121212] border-b dark:border-[#333]">
      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center justify-center py-3 px-4 bg-white dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-4 overflow-x-auto max-w-7xl w-full mx-auto">
          <ul className="flex gap-2 flex-1 justify-end text-sm font-medium whitespace-nowrap">
            {categories
              .slice(0, Math.ceil(categories.length / 2))
              .map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 py-2 rounded-full transition ${
                      currentCategory === cat
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 dark:bg-[#222] hover:bg-blue-100 dark:hover:bg-[#2a2a2a] text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
          </ul>

          <div className="px-4 py-1 ml-8 mr-8 rounded-full bg-gradient-to-r from-rose-50 via-red-100 to-orange-100 shadow-sm">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 tracking-wide select-none">
              आवाज़-ए-पूर्वांचल
            </h1>
          </div>

          <ul className="flex gap-2 flex-1 justify-start text-sm font-medium whitespace-nowrap">
            {categories.slice(Math.ceil(categories.length / 2)).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full transition ${
                    currentCategory === cat
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 dark:bg-[#222] hover:bg-blue-100 dark:hover:bg-[#2a2a2a] text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-white dark:bg-[#1a1a1a] shadow-md">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 tracking-wide">
          आवाज़-ए-पूर्वांचल
        </h1>
        <button
          className="text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t dark:border-[#333] bg-white dark:bg-[#1C1C1C] shadow-md">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-[#333] font-medium">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-6 py-3 transition ${
                    currentCategory === cat
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : "hover:bg-blue-50 dark:hover:bg-[#2E2E2E]"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
