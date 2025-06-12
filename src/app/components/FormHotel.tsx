"use client";

import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface ImagePreview {
  file: File;
  url: string;
}

interface HotelFormProps {
  onSuccess: () => void;
}

export default function HotelForm({ onSuccess }: HotelFormProps) {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3 - images.length);
    const newPreviews: ImagePreview[] = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newPreviews]);
    e.target.value = ""; // reset input supaya bisa upload ulang file yang sama
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return; // cegah double click

    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const city = (form.elements.namedItem("city") as HTMLInputElement).value;

    if (!name || !city || images.length === 0) {
      alert("Harap isi semua field dan unggah gambar.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const uploadedImageUrls: string[] = [];

    for (const img of images) {
      const fileExt = img.file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("hotel-images")
        .upload(filePath, img.file);

      if (uploadError) {
        console.error("Upload gagal:", uploadError);
        alert("Gagal mengunggah gambar.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("hotel-images")
        .getPublicUrl(filePath);

      uploadedImageUrls.push(publicUrlData.publicUrl);
    }

    const { error: insertError } = await supabase.from("hotels").insert({
      name,
      city,
      images: uploadedImageUrls, // kolom bertipe text[]
    });

    setLoading(false);

    if (insertError) {
      console.error("Insert gagal:", insertError);
      alert("Gagal menyimpan data hotel.");
    } else {
      alert("Hotel berhasil ditambahkan!");
      setImages([]);
      form.reset();
      setName("");
      setCity("");
      onSuccess(); // ✅ panggil fetchHotels dari Hotels.tsx
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-5  rounded-md ">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Masukkan nama hotel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            type="text"
            placeholder="Masukkan nama kota"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Upload Gambar <span className="text-red-500">*</span>
          </label>

          {/* Preview Images */}
          <div className="flex space-x-4 mb-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={`Preview ${idx}`}
                  width={96}
                  height={96}
                  className="object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1 text-sm hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* File Input - only if less than 3 images */}
          {images.length < 3 && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          )}
        </div>

        <div className="w-full  flex justify-end">
          <button
            type="submit"
            className={`px-6 w-full py-2 rounded-md transition text-white ${
              loading || !name || !city || images.length === 0
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading || !name || !city || images.length === 0}
          >
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
