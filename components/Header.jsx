"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  NewspaperIcon,
  UserGroupIcon,
  HomeIcon,
  GlobeAltIcon,
  MapIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

const categoryIcons = {
  होम: <HomeIcon className="h-5 w-5 text-blue-600" />,
  देश: <GlobeAltIcon className="h-5 w-5 text-blue-600" />,
  राज्य: <MapIcon className="h-5 w-5 text-blue-600" />,
  "संत कबीर नगर": <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />,
  गोरखपुर: <BuildingLibraryIcon className="h-5 w-5 text-blue-600" />,
  बस्ती: <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />,
  राजनीति: <BanknotesIcon className="h-5 w-5 text-blue-600" />,
  क्राइम: <ShieldExclamationIcon className="h-5 w-5 text-blue-600" />,
};

const categories = [
  "होम",
  "देश",
  "राज्य",
  "संत कबीर नगर",
  "गोरखपुर",
  "बस्ती",
  "राजनीति",
  "क्राइम",
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
    <header className="fixed top-0 left-0 w-full z-50 shadow bg-white dark:bg-[#121212] border-b dark:border-[#333]">
      {/* Desktop Nav */}
      <div className="hidden lg:grid grid-cols-3 items-center py-3 px-4">
        {/* Left: संपादकीय */}
        <div className="flex justify-start">
          <button
            onClick={() => router.push("/About-Me")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-[#222] hover:bg-blue-100 dark:hover:bg-[#2a2a2a] text-gray-800 dark:text-gray-300 font-medium transition"
            title="संपादकीय"
          >
            <NewspaperIcon className="h-5 w-5" />
            <span>संपादकीय</span>
          </button>
        </div>

        {/* Center: Brand Name */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-6 py-1 rounded-full bg-gradient-to-r from-slate-100 via-gray-200 to-slate-300 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src="/logo1.jpg"
                alt="Awaaz-e-Purvanchal Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
              />
              <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-slate-700 to-gray-500 tracking-wide">
                आवाज़-ए-पूर्वांचल
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Right: रिपोर्टर */}
        <div className="flex justify-end">
          <button
            onClick={() => router.push("/reporters")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-[#222] hover:bg-blue-100 dark:hover:bg-[#2a2a2a] text-gray-800 dark:text-gray-300 font-medium transition"
            title="रिपोर्टर"
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>रिपोर्टर</span>
          </button>
        </div>
      </div>

      {/* Category Scroll Bar (below brand) */}
      <div className="hidden lg:flex justify-center bg-white dark:bg-[#1a1a1a] py-2 px-4">
        <ul className="flex gap-2 overflow-x-auto text-sm font-medium">
          {categories.map((cat) => (
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

      {/* Mobile Nav */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-white dark:bg-[#1a1a1a] shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="/logo1.jpg"
            alt="Logo"
            className="h-8 w-8 object-contain rounded-full"
          />
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 tracking-wide"
          >
            आवाज़-ए-पूर्वांचल
          </motion.h1>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
                  className={`w-full text-left px-6 py-3 transition flex items-center gap-2 ${
                    currentCategory === cat
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : "hover:bg-blue-50 dark:hover:bg-[#2E2E2E]"
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/reporters");
                }}
                className="w-full text-left px-6 py-3 hover:bg-blue-50 dark:hover:bg-[#2E2E2E] flex items-center gap-2"
              >
                <UserGroupIcon className="h-5 w-5" />
                रिपोर्टर
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/About-Me");
                }}
                className="w-full text-left px-6 py-3 hover:bg-blue-50 dark:hover:bg-[#2E2E2E] flex items-center gap-2"
              >
                <NewspaperIcon className="h-5 w-5" />
                संपादकीय
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
