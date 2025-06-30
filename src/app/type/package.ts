export type Bandara = {
  id: string;
  name: string;
};

export type Hotel = {
  id: number;
  name: string;
  images: string[];
  image_url: string; // gabungan comma separated
};

export type Pesawat = {
  id: string;
  nama_pesawat: string;
};

export type PackageData = {
  id: string;
  title: string;
  tanggal_keberangkatan: string;
  hotel_makkah_id: number;
  hotel_madinah_id: number;
  pesawat_id: string;
  bandara_awal_id: string;
  transit_id: string | null;
  bandara_tiba_id: string;
  image_package: string;
  image_package_url: string;
  price: string;
  day: number;
  jenis_paket: string;

  hotel_makkah: Hotel;
  hotel_madinah: Hotel;
  pesawat: Pesawat;
  bandara_awal: Bandara;
  transit: Bandara | null;
  bandara_tiba: Bandara;
};
