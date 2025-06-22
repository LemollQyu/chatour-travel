import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const supabase = await createClient();

  // 🔍 Cek apakah ID ini digunakan di package
  try {
    const [awal, tiba, transit] = await Promise.all([
      supabase
        .from("package")
        .select("id", { head: true, count: "exact" })
        .eq("bandara_awal_id", id),
      supabase
        .from("package")
        .select("id", { head: true, count: "exact" })
        .eq("bandara_tiba_id", id),
      supabase
        .from("package")
        .select("id", { head: true, count: "exact" })
        .eq("transit_id", id),
    ]);

    const totalUsed =
      (awal.count ?? 0) + (tiba.count ?? 0) + (transit.count ?? 0);

    if (totalUsed > 0) {
      return NextResponse.json(
        { error: "Lokasi ini masih digunakan dalam paket perjalanan." },
        { status: 409 }
      );
    }
  } catch (e) {
    console.error("Gagal cek relasi lokasi:", e);
    return NextResponse.json(
      { error: "Gagal mengecek apakah lokasi digunakan dalam paket." },
      { status: 500 }
    );
  }

  // ✅ Tidak digunakan, lanjut hapus
  const { error } = await supabase
    .from("location_airports")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
