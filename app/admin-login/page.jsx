"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      document.cookie = `admin_token=${password}; path=/`;
      window.location.href = "/secret-admin-path/dashboard";
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="password"
        placeholder="Admin password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8 }}
      />
      <button onClick={handleLogin} style={{ padding: 8, marginLeft: 10 }}>
        Login
      </button>
    </div>
  );
}
