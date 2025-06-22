import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient(); // tidak perlu await di sini
  const body = await req.json();

  const name = body.name?.trim().slice(0, 20) || "Anonymous";
  const message = body.message?.trim();
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    body.ip_address ||
    "unknown";

  // ✅ Validasi input
  if (!message || message.length < 50 || name.length > 20) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // ⏱️ Cek IP agar tidak spam (dalam 20 menit)
  const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000).toISOString();
  const { data: recent, error: recentError } = await supabase
    .from("testimonials")
    .select("id")
    .eq("ip_address", ip)
    .gte("created_at", twentyMinutesAgo);

  if (recentError) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (recent && recent.length > 0) {
    return NextResponse.json(
      { error: "Silakan tunggu 20 menit sebelum mengirim lagi." },
      { status: 429 }
    );
  }

  // 🧹 Hapus testimonial paling lama jika total 10+
  const { data: allTestimonials, error: fetchError } = await supabase
    .from("testimonials")
    .select("id")
    .order("created_at", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }

  if (allTestimonials && allTestimonials.length >= 10) {
    const oldest = allTestimonials[0];
    await supabase.from("testimonials").delete().eq("id", oldest.id);
  }

  // 📝 Simpan testimonial baru
  const { error: insertError } = await supabase.from("testimonials").insert([
    {
      name,
      message,
      ip_address: ip,
    },
  ]);

  if (insertError) {
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ testimonials: data });
}
