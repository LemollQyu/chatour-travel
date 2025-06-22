"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitPesawat(formData: FormData) {
  const supabase = await createClient();

  const namaPesawat = formData.get("namaPesawat") as string;
  const kodePesawat = formData.get("kodePesawat") as string;

  if (!namaPesawat) {
    return { success: false, message: "Nama pesawat wajib diisi" };
  }

  try {
    await supabase.from("pesawat").insert({
      nama_pesawat: namaPesawat,
      kode_pesawat: kodePesawat || null,
    });

    return { success: true, message: "Data berhasil disimpan" };
  } catch {
    return { success: false, message: "Terjadi kesalahan saat menyimpan data" };
  }
}

export async function hapusPesawat(id: string) {
  const supabase = await createClient();

  // Cek apakah pesawat sedang digunakan
  const { data: relatedPackages, error: checkError } = await supabase
    .from("package")
    .select("id")
    .eq("pesawat_id", id);

  // Jika error saat cek, redirect dengan pesan error
  if (checkError) {
    return redirect(
      "/dashboard/pesawat?error=Gagal%20memeriksa%20relasi%20pesawat"
    );
  }

  // Jika masih digunakan, jangan hapus
  if (Array.isArray(relatedPackages) && relatedPackages.length > 0) {
    return redirect(
      "/dashboard/pesawat?error=Pesawat%20masih%20digunakan%20di%20package"
    );
  }

  // Lanjutkan hapus
  const { error: deleteError } = await supabase
    .from("pesawat")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return redirect("/dashboard/pesawat?error=Gagal%20menghapus%20pesawat");
  }

  // Refresh dan redirect
  revalidatePath("/dashboard/pesawat");
  return redirect("/dashboard/pesawat");
}
