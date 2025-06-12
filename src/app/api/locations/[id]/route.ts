// app/api/locations/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } } // ✅ langsung gunakan `context` tanpa await
) {
  const { id } = context.params; // ✅ akses langsung
  const supabase = await createClient();

  const { error } = await supabase
    .from("location_airports")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
