"use client";

import { useEffect, useState } from "react";
import TestimonialInput from "./InputTestimonial";
import { createClient } from "@/utils/supabase/client";
import TestimonialSkeleton from "./TestimonialSkelton"; // ← import dulu

interface Testimonial {
  name: string;
  message: string;
  created_at?: string;
}

export default function Testimonials() {
  const [ada, setAda] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const pad = (n: number) => String(n).padStart(2, "0");

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${hours}:${minutes}/${day}-${month}-${year}`;
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonial");
      const result = await res.json();

      if (res.ok) {
        setTestimonials(result.testimonials);
      } else {
        console.error("Gagal ambil testimonial:", result.error);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    const supabase = createClient(); // 🆕 ambil instance

    const channel = supabase
      .channel("realtime:testimonials")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "testimonials",
        },
        (payload) => {
          const newTestimonial = payload.new as Testimonial;

          // Pastikan payload.new punya `name` dan `message`
          if (newTestimonial.name && newTestimonial.message) {
            setTestimonials((prev) => {
              const updated = [newTestimonial, ...prev];
              return updated.slice(0, 6); // maksimal 6
            });
          }
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Hapus langganan realtime saat unmount
    };
  }, []);

  return (
    <>
      <section
        className="py-8 px-6 bg-base"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div>
          <h1 className="relative font-stopsn text-center text-xl md:text-2xl tracking-wider pb-8 text-dark">
            Pesan & Kesan Jamaah
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {loading ? (
            <>
              {[...Array(4)].map((_, idx) => (
                <TestimonialSkeleton key={idx} />
              ))}
            </>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-dark">Belum ada testimonial.</p>
          ) : (
            testimonials.map((t, i) => (
              <div key={i} className="border-b border-dark/50 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold font-custom text-dark">
                    {t.name}
                  </h3>
                  <p className="font-stopsn md:text-xs tracking-widest text-[0.5rem]">
                    {t.created_at ? formatDate(t.created_at) : ""}
                  </p>
                </div>
                <p className="font-custom text-dark md:text-sm text-xs">
                  {t.message}
                </p>
              </div>
            ))
          )}

          <button
            onClick={() => setAda(true)}
            className="bg-dark rounded-xl py-1 md:py-2 px-6 font-stopsn text-lg text-base transition-all hover:text-accentt border-transparent hover:border-accentt border-2"
          >
            Reviews
          </button>
        </div>
      </section>

      {ada && (
        <div className="fixed inset-0 z-50 px-5 bg-black/60 flex items-center justify-center">
          <div className="relative z-60 max-w-xl w-full bg-base">
            <button
              className="w-4 h-4 absolute top-1 left-1 rounded-full bg-accent hover:bg-accentt"
              onClick={() => setAda(false)}
            ></button>
            {/* Kirim callback ke InputTestimonial */}
            <TestimonialInput onSuccess={fetchTestimonials} />
          </div>
        </div>
      )}
    </>
  );
}
