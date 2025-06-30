"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import { FiTrash } from "react-icons/fi";

type Testimonial = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const Pesan = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Testimonial | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const cancelDelete = () => setConfirmDelete(null);

  const deleteTestimonial = async (t: Testimonial) => {
    setIsDeleting(true);
    const res = await fetch(`/api/testimonial/${t.id}`, { method: "DELETE" });

    if (res.ok) {
      setTestimonials((prev) => prev.filter((item) => item.id !== t.id));
      setConfirmDelete(null);
    } else {
      alert("Gagal menghapus.");
    }

    setIsDeleting(false);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchInitialData();

    const channel = supabase
      .channel("realtime-testimonials")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTestimonials((prev) =>
              [payload.new as Testimonial, ...prev].slice(0, 6)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <section
        className="py-8 px-6 bg-primary"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div>
          <h1 className="relative font-stopsn text-center text-xl md:text-2xl tracking-wider pb-8 text-dark">
            Pesan & Kesan Jamaah
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {loading ? (
            <p className="text-center text-dark">Memuat testimonial...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-dark">Belum ada testimonial.</p>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="border-b border-dark/50 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold font-custom text-dark">
                    {t.name}
                  </h3>
                  <button
                    onClick={() => setConfirmDelete(t)}
                    className="transition-all w-7 h-7 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
                  >
                    <FiTrash className="text-secondary text-sm" />
                  </button>
                </div>
                <p className="font-custom text-dark md:text-sm text-xs">
                  {t.message}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Popup Konfirmasi */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-5 p-4 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-dark">
              Konfirmasi Hapus
            </h2>
            <p className="text-dark text-sm">
              Apakah kamu yakin ingin menghapus Pesan & Kesan dari{" "}
              <b>{confirmDelete.name}</b>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-dark rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => deleteTestimonial(confirmDelete)}
                disabled={isDeleting}
                className={`px-4 py-2 rounded text-white transition-all ${
                  isDeleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pesan;
