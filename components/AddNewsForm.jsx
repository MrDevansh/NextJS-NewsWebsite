"use client";

import { useState } from "react";

const categoryOptions = [
  "देश",
  "राज्य",
  "संत कबीर नगर",
  "गोरखपुर",
  "बस्ती",
  "राजनीति",
  "क्राइम",
  "संपादकीय",
  "रिपोर्टर",
  "संपर्क",
];

export default function AddNewsForm({ onNewsAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      const res = await fetch("/api/news", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add news");

      setMessage("✅ News added successfully!");
      setFormData({ title: "", content: "", author: "", category: "" });
      setThumbnail(null);
      setPreviewURL(null);

      if (onNewsAdded) onNewsAdded();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding news.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#e8f0fe] via-[#f3f9ff] to-[#ffffff] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-teal-700 mb-6">
          📰 Add News Article
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
              required
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
                required
              >
                <option value="">-- Select Category --</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800"
            />
            {previewURL && (
              <div className="mt-3">
                <img
                  src={previewURL}
                  alt="Thumbnail Preview"
                  className="h-40 rounded-lg object-cover border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 font-semibold text-white rounded-lg ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
            } transition duration-300`}
            disabled={loading}
          >
            {loading ? "Saving..." : "🚀 Submit News"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm mt-4 text-blue-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
