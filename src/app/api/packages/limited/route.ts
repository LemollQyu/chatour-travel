// File: /app/api/packages/limited/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package")
    .select("title, image_package")
    .limit(8);

  if (error) {
    console.error("Fetch error:", error.message);
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }

  const enrichedData = data.map((pkg) => {
    const { data: imageData } = supabase.storage
      .from("program-banners")
      .getPublicUrl(pkg.image_package);

    return {
      title: pkg.title,
      image_package_url: imageData?.publicUrl || null,
    };
  });

  return NextResponse.json(enrichedData);
}
