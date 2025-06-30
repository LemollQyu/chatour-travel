import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const tanggal_keberangkatan = formData.get("tanggal_keberangkatan") as string;
  const hotel_makkah_id = formData.get("hotel_makkah_id") as string;
  const hotel_madinah_id = formData.get("hotel_madinah_id") as string;
  const pesawat_id = formData.get("pesawat_id") as string;
  const bandara_awal_id = formData.get("bandara_awal_id") as string;
  const transit_id = formData.get("transit_id") as string;
  const bandara_tiba_id = formData.get("bandara_tiba_id") as string;
  const price = formData.get("price") as string;
  const day = parseInt(formData.get("day") as string, 10);
  const jenis_paket = formData.get("jenisPaket") as string;
  const jenis_perjalanan = formData.get("jenis_perjalanan") as string;

  const image = formData.get("image") as File | null;
  let image_package = "";

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `program-banners/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("program-banners")
      .upload(filePath, buffer, {
        contentType: image.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return NextResponse.json(
        { error: "Gagal upload gambar" },
        { status: 500 }
      );
    }

    image_package = filePath;
  }

  const { data, error } = await supabase.from("package").insert([
    {
      title,
      day,
      jenis_perjalanan,
      jenis_paket,
      tanggal_keberangkatan,
      hotel_makkah_id,
      hotel_madinah_id,
      pesawat_id,
      bandara_awal_id,
      transit_id: transit_id || null,
      bandara_tiba_id,
      image_package,
      price,
    },
  ]);

  if (error) {
    console.error("Insert error:", error); // bukan hanya .message
    return NextResponse.json(
      { error: error.message }, // biar tahu error asli di client
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const jenisPerjalanan = searchParams.get("jenis_perjalanan");
  const bulanTahun = searchParams.get("bulan_tahun"); // e.g., "2025-07"
  const jenisPaket = searchParams.get("jenis_paket");

  let query = supabase.from("package").select(`
    *,
    hotel_makkah:hotel_makkah_id (id, name, images),
    hotel_madinah:hotel_madinah_id (id, name, images),
    pesawat:pesawat_id (id, nama_pesawat),
    bandara_awal:bandara_awal_id (id, name),
    transit:transit_id (id, name),
    bandara_tiba:bandara_tiba_id (id, name)
  `);

  if (jenisPerjalanan) {
    query = query.eq("jenis_perjalanan", jenisPerjalanan);
  }

  if (jenisPaket) {
    query = query.eq("jenis_paket", jenisPaket);
  }

  if (bulanTahun) {
    const [year, month] = bulanTahun.split("-").map(Number);
    const startDate = new Date(year, month - 1, 1); // e.g., 2025-07-01
    const endDate = new Date(year, month, 1); // e.g., 2025-08-01

    query = query.gte("tanggal_keberangkatan", startDate.toISOString());
    query = query.lt("tanggal_keberangkatan", endDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error detail:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data package" },
      { status: 500 }
    );
  }

  const enrichedData = data.map((pkg) => {
    const { data: packageImage } = supabase.storage
      .from("program-banners")
      .getPublicUrl(pkg.image_package);

    const { data: makkahImage } = supabase.storage
      .from("hotel-images")
      .getPublicUrl(pkg.hotel_makkah?.images || "");

    const { data: madinahImage } = supabase.storage
      .from("hotel-images")
      .getPublicUrl(pkg.hotel_madinah?.images || "");

    return {
      ...pkg,
      image_package_url: packageImage?.publicUrl || null,
      hotel_makkah: {
        ...pkg.hotel_makkah,
        image_url: makkahImage?.publicUrl || null,
      },
      hotel_madinah: {
        ...pkg.hotel_madinah,
        image_url: madinahImage?.publicUrl || null,
      },
    };
  });

  return NextResponse.json(enrichedData);
}
