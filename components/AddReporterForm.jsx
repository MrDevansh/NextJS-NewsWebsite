"use client";

import { useState } from "react";
import { ImagePlus, User, Phone, MapPin, Send } from "lucide-react";

export default function AddReporterForm({ onReporterAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    contact: "",
  });

  const [photo, setPhoto] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
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
      if (photo) data.append("photo", photo);

      const res = await fetch("/api/reporters", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add reporter");

      setMessage("✅ Reporter added successfully!");
      setFormData({ name: "", area: "", contact: "" });
      setPhoto(null);
      setPreviewURL(null);
      onReporterAdded?.();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding reporter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-12 px-4 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">🧑‍💼 Add Reporter</h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="flex items-center text-sm text-gray-700 mb-1 gap-2">
              <User size={18} /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="flex items-center text-sm text-gray-700 mb-1 gap-2">
              <MapPin size={18} /> Reporting Area
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="flex items-center text-sm text-gray-700 mb-1 gap-2">
              <Phone size={18} /> Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="flex items-center text-sm text-gray-700 mb-1 gap-2">
              <ImagePlus size={18} /> Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            />
            {previewURL && (
              <div className="mt-3">
                <img
                  src={previewURL}
                  alt="Reporter Preview"
                  className="h-40 rounded-lg object-cover border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit */}
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
            {loading ? "Saving..." : "Add Reporter"}
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
