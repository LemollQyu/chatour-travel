"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Hotel {
  id: string;
  name: string;
  city: string;
  image_url?: string | null;
}

interface Airport {
  id: string;
  name: string;
  city: string;
  code: string;
}

interface Pesawat {
  id: string; // atau bisa pakai nama 'uuid' jika memang di API-nya begitu
  nama_pesawat: string;
  kode_pesawat: string;
}

interface FormPackageProps {
  onSuccessSubmit?: () => void;
}

export default function FormPerjalanan({ onSuccessSubmit }: FormPackageProps) {
  const [form, setForm] = useState({
    title: "",
    day: 0,
    jenisPerjalanan: "",
    jenisPaket: "",
    tanggalKeberangkatan: "",
    hotelMakkah: "",
    hotelMadinah: "",
    pesawat: "",
    transit: "",
    bandaraAwal: "",
    bandaraTransit: "",
    bandaraTiba: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const [hotelMakkahList, setHotelMakkahList] = useState<Hotel[]>([]);
  const [hotelMadinahList, setHotelMadinahList] = useState<Hotel[]>([]);
  const [airportList, setAirportList] = useState<Airport[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [pesawatList, setPesawatList] = useState<Pesawat[]>([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/hotels");
        const data: Hotel[] = await res.json();

        setHotelMakkahList(
          data?.filter((h) => h.city.toLowerCase() === "makkah")
        );
        setHotelMadinahList(
          data?.filter((h) => h.city.toLowerCase() === "madinah")
        );
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    async function fetchAirports() {
      try {
        const res = await fetch("/api/locations");
        const data: Airport[] = await res.json();
        setAirportList(data);
      } catch (error) {
        console.error("Failed to fetch airports", error);
      }
    }
    fetchAirports();
  }, []);

  useEffect(() => {
    async function fetchPesawat() {
      try {
        const res = await fetch("/api/airlines");
        const data: Pesawat[] = await res.json();
        setPesawatList(data);
      } catch (error) {
        console.error("Failed to fetch Pesawat", error);
      }
    }
    fetchPesawat();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleImageRemove() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("day", form.day.toString());
    formData.append("jenis_perjalanan", form.jenisPerjalanan);
    formData.append("jenisPaket", form.jenisPaket);
    formData.append("tanggal_keberangkatan", form.tanggalKeberangkatan);
    formData.append("hotel_makkah_id", form.hotelMakkah);
    formData.append("hotel_madinah_id", form.hotelMadinah);
    formData.append("pesawat_id", form.pesawat);
    formData.append("bandara_awal_id", form.bandaraAwal);
    formData.append("transit_id", form.bandaraTransit || "");
    formData.append("bandara_tiba_id", form.bandaraTiba);
    formData.append("price", form.price);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch("/api/packages", {
      method: "POST",
      body: formData,
    });

    // const result = await res.json();
    // console.log("Respon:", result);

    if (!res.ok) {
      const errorText = await res.text();
      alert("Gagal submit: " + errorText);
      return;
    }

    if (res.ok) {
      alert("Paket berhasil dibuat!");
      setForm({
        title: "",
        day: 0,
        jenisPerjalanan: "",
        jenisPaket: "",
        tanggalKeberangkatan: "",
        hotelMakkah: "",
        hotelMadinah: "",
        pesawat: "",
        transit: "",
        bandaraAwal: "",
        bandaraTransit: "",
        bandaraTiba: "",
        price: "",
      });
      setImageFile(null);
      setImagePreview(null);

      // 🔥 Panggil callback setelah submit sukses
      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
    }

    setLoading(false);
  }

  const listJenisPaket = ["2 Free 1", "Hemat", "Promo", "Reguler"];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-4 p-6 bg-white space-y-4 rounded-md"
    >
      {/* Upload Gambar */}
      <div>
        <label className="block font-bold mb-1">Upload Gambar</label>
        {!imagePreview ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        ) : (
          <div className="mx-auto relative w-48 h-48 mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              height={200}
              width={200}
              className="w-full h-full object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="absolute top-0 right-0 bg-red-600 text-white px-2 rounded-bl-md hover:bg-red-700"
            >
              ×
            </button>
          </div>
        )}
      </div>
      {/* Nama package */}
      <div>
        <label className="block font-bold mb-1">
          Nama Paket <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Nama paket"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* berapa hari */}
      <div>
        <label className="block font-bold mb-1">
          Berapa hari <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="day"
          value={form.day}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Jenis perjalanan */}
      <div>
        <label className="block font-bold mb-1">
          Jenis Perjalanan <span className="text-red-500">*</span>
        </label>
        <select
          name="jenisPerjalanan"
          value={form.jenisPerjalanan}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih</option>
          <option value="umroh">Umroh</option>
          <option value="haji">Haji</option>
        </select>
      </div>

      {/* Jenis paket */}
      <div>
        <label className="block font-bold mb-1">
          Jenis paket <span className="text-red-500">*</span>
        </label>
        <select
          name="jenisPaket"
          value={form.jenisPaket}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih</option>
          {listJenisPaket.map((jenis, id) => (
            <option key={id} value={jenis.toLowerCase()}>
              {jenis}
            </option>
          ))}
        </select>
      </div>

      {/* Tanggal Keberangkatan */}
      <div>
        <label className="block font-bold mb-1">
          Tanggal Keberangkatan <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="tanggalKeberangkatan"
          value={form.tanggalKeberangkatan}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Hotel Makkah */}
      <div>
        <label className="block font-bold mb-1">
          Hotel Makkah <span className="text-red-500">*</span>
        </label>
        <select
          name="hotelMakkah"
          value={form.hotelMakkah}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih hotel Makkah</option>
          {hotelMakkahList.map((hotel) => (
            <option key={hotel?.id} value={hotel?.id}>
              {hotel?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel Madinah */}
      <div>
        <label className="block font-bold mb-1">
          Hotel Madinah <span className="text-red-500">*</span>
        </label>
        <select
          name="hotelMadinah"
          value={form.hotelMadinah}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih hotel Madinah</option>
          {hotelMadinahList.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pesawat */}
      <div>
        <label className="block font-bold mb-1">
          Pesawat <span className="text-red-500">*</span>
        </label>
        <select
          name="pesawat"
          value={form.pesawat}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih pesawat</option>
          {pesawatList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nama_pesawat} ({p.kode_pesawat})
            </option>
          ))}
        </select>
      </div>

      {/* Bandara Awal */}
      <div>
        <label className="block font-bold mb-1">
          Bandara Awal <span className="text-red-500">*</span>
        </label>
        <select
          name="bandaraAwal"
          value={form.bandaraAwal}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih bandara awal</option>
          {airportList.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.name} ({airport.city}) - {airport.code}
            </option>
          ))}
        </select>
      </div>

      {/* Transit */}
      <div>
        <label className="block font-bold mb-1">
          Transit <i className="text-sm text-gray-500">(Opsional)</i>
        </label>
        <select
          name="bandaraTransit"
          value={form.bandaraTransit}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih bandara transit (jika ada)</option>
          {airportList.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.name} ({airport.city}) - {airport.code}
            </option>
          ))}
        </select>
      </div>

      {/* Bandara Tiba */}
      <div>
        <label className="block font-bold mb-1">
          Bandara Tiba <span className="text-red-500">*</span>
        </label>
        <select
          name="bandaraTiba"
          value={form.bandaraTiba}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih bandara tiba</option>
          {airportList.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.name} ({airport.city}) - {airport.code}
            </option>
          ))}
        </select>
      </div>

      {/* harga */}
      <div>
        <label className="block font-bold mb-1">
          Harga <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="price"
          placeholder="Rp."
          value={form.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-bold py-3 rounded-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Mengirim..." : "Submit"}
      </button>
    </form>
  );
}
