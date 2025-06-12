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

  useEffect(() => {
    setPesawatList(data || []);
  }, [data]);

  const handleDelete = async (id: string) => {
    const konfirmasi = confirm("Yakin ingin menghapus pesawat ini?");
    if (!konfirmasi) return;

    const supabase = createClient();

    const { error } = await supabase.from("pesawat").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus data: " + error.message);
      return;
    }

    // Hapus dari UI
    setPesawatList((prev) => prev.filter((item) => item.id !== id));
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
      <div
        className={`w-full sm:hidden block ${formTinggi} border transition-all bg-white`}
      >
        <div className={`w-full ${ada} p-5`}>
          <h1 className="font-stopsn">Input Pesawat</h1>
          <p className="text-sm font-normal">Masukan nama pesawat</p>
          {children}
        </div>
      </div>

      <div className="w-full px-5 pt-4 sm:hidden  flex items-center justify-between">
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

      <div className="sm:flex hidden w-full">
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
                    onClick={() => handleDelete(p.id)}
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
          className={`h-screen hidden sm:block ${formLebar} border transition-all bg-white`}
        >
          <div className={`w-full ${ada} p-5`}>
            <h1 className="font-stopsn">Input Pesawat</h1>
            <p className="text-sm font-normal">Masukan nama pesawat</p>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
