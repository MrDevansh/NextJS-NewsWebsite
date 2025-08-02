"use client";

import Header from "@/components/Header";
import NewsList from "@/components/NewsList";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("होम");

  return (
    <main>
      <Header currentCategory={category} setCategory={setCategory} />
      <div className="pt-28 px-4 max-w-6xl mx-auto">
        <NewsList selectedCategory={category} />
      </div>
    </main>
  );
}
