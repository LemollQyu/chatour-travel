import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  // Cek sesi login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Hapus berdasarkan id dari parameter
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(
      { error: "Gagal menghapus testimonial" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
