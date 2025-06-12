import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import formidable, { File } from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";

// App Router tidak bisa langsung pakai form.parse(req: NextRequest),
// jadi perlu diconvert ke IncomingMessage yang bisa dipakai oleh formidable.
async function parseForm(
  req: IncomingMessage
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    uploadDir: "/tmp",
    keepExtensions: true,
    maxFiles: 3,
    maxFileSize: 5 * 1024 * 1024,
    allowEmptyFiles: false,
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    // Convert NextRequest body into a readable stream
    const { fields, files } = await parseForm(
      req.body as unknown as IncomingMessage
    );

    const hotelIdField = fields.hotelId;
    const hotelId =
      typeof hotelIdField === "string"
        ? hotelIdField
        : Array.isArray(hotelIdField)
        ? hotelIdField[0]
        : null;

    if (!hotelId) {
      return NextResponse.json(
        { error: "hotelId wajib diisi" },
        { status: 400 }
      );
    }

    let images = files.image as File[] | File | undefined;
    if (!images) {
      return NextResponse.json(
        { error: "Minimal satu gambar harus diupload" },
        { status: 400 }
      );
    }

    if (!Array.isArray(images)) images = [images];
    if (images.length > 3) {
      return NextResponse.json(
        { error: "Maksimal upload 3 gambar" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of images) {
      if (!file.filepath || !file.originalFilename) continue;

      try {
        const fileContent = fs.readFileSync(file.filepath);
        const filePath = `${hotelId}/${Date.now()}_${file.originalFilename}`;

        const { error: uploadError } = await supabase.storage
          .from("hotel-images")
          .upload(filePath, fileContent, {
            contentType: file.mimetype || "image/jpeg",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("hotel-images")
          .getPublicUrl(filePath);

        const imageUrl = urlData?.publicUrl;
        if (!imageUrl) continue;

        const { error: dbError } = await supabase
          .from("hotel_images")
          .insert({ hotel_id: hotelId, image_url: imageUrl });

        if (dbError) {
          console.error("DB insert error:", dbError);
          continue;
        }

        uploadedUrls.push(imageUrl);
        await fs.promises.unlink(file.filepath);
      } catch (err) {
        console.error("File upload error:", err);
        continue;
      }
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { error: "Semua upload gagal", uploaded: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Upload selesai",
      count: uploadedUrls.length,
      uploaded: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal memproses upload" },
      { status: 500 }
    );
  }
}
