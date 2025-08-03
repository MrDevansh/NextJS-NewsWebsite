"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users } from "lucide-react";
import BackToHomeButton from "@/components/BackToHomeButton";

export default function ReportersPage() {
  const [reporters, setReporters] = useState([]);

  useEffect(() => {
    const fetchReporters = async () => {
      try {
        const res = await fetch("/api/reporters");
        const data = await res.json();
        setReporters(data);
      } catch (error) {
        console.error("Failed to fetch reporters:", error);
      }
    };

    fetchReporters();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-white text-slate-800 py-10 px-4">
      <BackToHomeButton />

      {/* Heading with Icon */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="bg-white/80 shadow-md border border-slate-300 text-center py-6 px-6 rounded-3xl flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-slate-700">
            <Users size={32} strokeWidth={2.2} className="text-slate-600" />
            <h1 className="text-4xl font-extrabold tracking-wide uppercase">
              हमारे रिपोर्टर
            </h1>
          </div>
          <p className="text-slate-600 mt-1 font-medium tracking-tight text-sm">
            जानिए कौन हैं हमारे जमीनी पत्रकार
          </p>
        </div>
      </motion.div>

      {/* Reporter Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reporters.map((rep, idx) => (
          <motion.div
            key={rep._id || idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex flex-col items-center hover:shadow-2xl transition"
          >
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner">
              <Image
                src={rep.photoUrl || "/default-avatar.jpg"}
                alt={rep.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-lg font-bold mb-1">{rep.name}</h2>
            <p className="text-sm text-slate-600 mb-1">📍 {rep.area}</p>
            <p className="text-sm text-slate-500">📞 {rep.contact}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
