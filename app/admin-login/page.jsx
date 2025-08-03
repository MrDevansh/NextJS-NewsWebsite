"use client";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      document.cookie = `admin_token=${password}; path=/`;
      window.location.href = "/secret-admin-path/dashboard";
    } else {
      alert("❌ गलत पासवर्ड!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-700 rounded-lg bg-[#2a2a2a] text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
        >
          लॉगिन करें
        </button>
      </div>
    </div>
  );
}
