"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

export async function hapusPesawat(id: number) {
  const supabase = await createClient();
  await supabase.from("pesawat").delete().eq("id", id);
  revalidatePath("/dashboard/pesawat"); // agar data direfresh setelah hapus
}
