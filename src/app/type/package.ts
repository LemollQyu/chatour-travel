export interface Hotel {
  id: string;
  name: string;
  images: string;
}

export interface Pesawat {
  id: string;
  nama_pesawat: string;
}

export interface Bandara {
  id: string;
  name: string;
}

export interface PackageData {
  id: string;
  tanggal_keberangkatan: string;

  // Relasi ID (opsional jika kamu tidak butuh di frontend)
  pesawat_id: string;
  hotel_makkah_id: string;
  hotel_madinah_id: string;
  bandara_awal_id: string;
  transit_id?: string | null;
  bandara_tiba_id: string;

  // Image path dari Supabase storage
  image_package: string;
  image_package_url?: string;

  // Relasi objek
  pesawat: Pesawat | null;
  hotel_makkah: Hotel | null;
  hotel_madinah: Hotel | null;
  bandara_awal: Bandara | null;
  transit: Bandara | null;
  bandara_tiba: Bandara | null;
}
