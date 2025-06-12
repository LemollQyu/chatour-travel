import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const code = formData.get("code") as string | null;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  if (!name || !city || !country) {
    return NextResponse.json(
      { success: false, message: "Data wajib tidak lengkap." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("location_airports")
    .insert([{ name, code, city, country }])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Lokasi berhasil ditambahkan!",
    data,
  });
}
