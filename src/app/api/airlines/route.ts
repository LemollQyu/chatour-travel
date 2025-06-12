import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient(); // tidak perlu pakai `await`

  const { data, error } = await supabase
    .from("pesawat")
    .select("id, nama_pesawat, kode_pesawat");

  if (error) {
    console.error("Error fetching airlines:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch airlines", detail: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
