"use client";

import { useState, ReactNode, useEffect } from "react";
import { FiPlus, FiArrowRight, FiArrowUp, FiTrash } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client"; // sesuaikan path-nya

type Pesawat = {
  id: string;
  nama_pesawat: string;
  kode_pesawat: string | null;
  created_at: string;
};

type FormToggleProps = {
  children: ReactNode;
  data?: Pesawat[];
};

export default function FormToggle({ children, data }: FormToggleProps) {
  const [formLebar, setFormLebar] = useState("w-0");
  const [ada, setAda] = useState("hidden");
  const [formTinggi, setFormTinggi] = useState("h-0");
  const [pesawatList, setPesawatList] = useState<Pesawat[]>(data || []);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPesawat, setSelectedPesawat] = useState<Pesawat | null>(null);

  useEffect(() => {
    setPesawatList(data || []);
  }, [data]);

  const handleDelete = (pesawat: Pesawat) => {
    setSelectedPesawat(pesawat);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedPesawat) return;

    const supabase = createClient();

    // Cek relasi
    const { data: relatedPackages, error: checkError } = await supabase
      .from("package")
      .select("id")
      .eq("pesawat_id", selectedPesawat.id);

    if (checkError) {
      setErrorMessage("Gagal memeriksa relasi pesawat.");
      setShowConfirm(false);
      return;
    }

    if (relatedPackages.length > 0) {
      setErrorMessage("Pesawat masih digunakan di package.");
      setShowConfirm(false);
      return;
    }

    const { error } = await supabase
      .from("pesawat")
      .delete()
      .eq("id", selectedPesawat.id);

    if (error) {
      setErrorMessage("Gagal menghapus data: " + error.message);
      setShowConfirm(false);
      return;
    }

    setPesawatList((prev) =>
      prev.filter((item) => item.id !== selectedPesawat.id)
    );
    setShowConfirm(false);
  };

  const handleClickBukaKanan = () => {
    if (formLebar === "w-0") {
      setFormLebar("w-[470px]");
      setAda("block");
    } else {
      setFormLebar("w-0");
      setAda("hidden");
    }
  };

  const handleClickBukaAtas = () => {
    if (formTinggi === "h-0") {
      setFormTinggi("h-[350px]");
      setAda("block");
    } else {
      setFormTinggi("h-0");
      setAda("hidden");
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="bg-red-100 mx-4 text-red-600 p-3 mb-4 rounded-sm border border-red-300 flex justify-between items-center">
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage("")}
            className="text-red-500 hover:text-red-700 font-bold ml-4"
            aria-label="Close alert"
          >
            ×
          </button>
        </div>
      )}

      <div
        className={`w-full sm:hidden block ${formTinggi}  transition-all bg-white`}
      >
        <div className={`w-full ${ada} p-5`}>
          <h1 className="font-stopsn">Input Pesawat</h1>
          <p className="text-sm font-normal">Masukan nama pesawat</p>
          {children}
        </div>
      </div>

      <div
        className="w-full px-5 pt-4 sm:hidden  flex items-center justify-between"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <h1 className="font-stopsn">Pesawat penerbangan</h1>
        <button
          onClick={handleClickBukaKanan}
          className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full hidden sm:flex items-center justify-center"
        >
          {formLebar === "w-0" ? (
            <FiPlus className="text-secondary text-xs md:text-lg" />
          ) : (
            <FiArrowRight className="text-secondary text-xs md:text-lg" />
          )}
        </button>
        <button
          onClick={handleClickBukaAtas}
          className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex sm:hidden items-center justify-center"
        >
          {formTinggi === "h-0" ? (
            <FiPlus className="text-secondary text-xs md:text-lg" />
          ) : (
            <FiArrowUp className="text-secondary text-xs md:text-lg" />
          )}
        </button>
      </div>

      <div
        className="sm:flex hidden w-full"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div className="w-full">
          <div className="w-full px-5 pt-4 sm:flex hidden items-center justify-between">
            <h1 className="font-stopsn">Pesawat penerbangan</h1>
            <button
              onClick={handleClickBukaKanan}
              className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full hidden sm:flex items-center justify-center"
            >
              {formLebar === "w-0" ? (
                <FiPlus className="text-secondary text-xs md:text-lg" />
              ) : (
                <FiArrowRight className="text-secondary text-xs md:text-lg" />
              )}
            </button>
            <button
              onClick={handleClickBukaAtas}
              className="transition-all w-8 h-8 bg-white focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex sm:hidden items-center justify-center"
            >
              {formTinggi === "h-0" ? (
                <FiPlus className="text-secondary text-xs md:text-lg" />
              ) : (
                <FiArrowUp className="text-secondary text-xs md:text-lg" />
              )}
            </button>
          </div>
          <div className="w-full px-5 pt-4">
            {pesawatList.length === 0 ? (
              <p>Belum ada data pesawat.</p>
            ) : (
              pesawatList.map((p) => (
                <div
                  key={p.id}
                  className="p-2 flex mt-2 bg-white rounded-sm w-full border justify-between"
                >
                  <div>
                    <p className="font-semibold">{p.nama_pesawat}</p>
                    <p className="text-sm text-gray-600">
                      {p.kode_pesawat || "-"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(p)}
                    className="transition-all w-7 h-7 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
                  >
                    <FiTrash className="text-secondary text-sm" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div
          className={`h-screen hidden sm:block ${formLebar}  transition-all bg-white`}
        >
          <div className={`w-full ${ada} p-5`}>
            <h1 className="font-stopsn">Input Pesawat</h1>
            <p className="text-sm font-normal">Masukan nama pesawat</p>
            {children}
          </div>
        </div>
      </div>

      {showConfirm && selectedPesawat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white mx-5 p-3 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p>
              Apakah kamu yakin ingin menghapus pesawat{" "}
              <b>{selectedPesawat.nama_pesawat}</b>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
