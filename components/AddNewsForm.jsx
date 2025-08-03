"use client";

import { useState } from "react";
import { ImagePlus, FileText, User, Tag, Send } from "lucide-react";

const categoryOptions = [
  "देश",
  "राज्य",
  "संत कबीर नगर",
  "गोरखपुर",
  "बस्ती",
  "राजनीति",
  "क्राइम",
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
    setPreviewURL(file ? URL.createObjectURL(file) : null);
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
      if (thumbnail) data.append("thumbnail", thumbnail);

      const res = await fetch("/api/news", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add news");

      setMessage("✅ News added successfully!");
      setFormData({ title: "", content: "", author: "", category: "" });
      setThumbnail(null);
      setPreviewURL(null);
      onNewsAdded?.();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding news.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-12 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">
          📰 Add News Article
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="flex items-center text-sm text-gray-600 mb-1 gap-2">
              <FileText size={18} /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center text-sm text-gray-600 mb-1 gap-2">
              <FileText size={18} /> Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm text-gray-600 mb-1 gap-2">
                <User size={18} /> Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm text-gray-600 mb-1 gap-2">
                <Tag size={18} /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <label className="flex items-center text-sm text-gray-600 mb-1 gap-2">
              <ImagePlus size={18} /> Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
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
            className={`w-full py-3 font-semibold rounded-lg flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600"
            } transition duration-300`}
            disabled={loading}
          >
            <Send size={18} />
            {loading ? "Saving..." : "Submit News"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm mt-4 text-blue-600 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
