import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
import FormToggle from "@/app/components/FormTogglePesawat"; // komponen client untuk buka tutup form
import { FiTrash } from "react-icons/fi";
import { hapusPesawat } from "@/actions/pesawatActions";

type Pesawat = {
  id: number;
  nama_pesawat: string;
  kode_pesawat: string | null;
};

const DynamicFormPesawat = dynamic(
  () => import("@/app/components/FormPesawat"),
  {
    ssr: true,
  }
);

export default async function Pesawat() {
  const supabase = await createClient();

  const { data: pesawatDataRaw, error } = await supabase
    .from("pesawat")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  // Beri default empty array supaya pesawatData selalu array, bukan null
  const pesawatData = (pesawatDataRaw ?? []) as Pesawat[];
  return (
    <>
      <div className="w-full  sm:hidden  flex-cols flex sm:flex-row">
        <div className="w-full ">
          <div className="sm:hidden block">
            <FormToggle data={pesawatDataRaw}>
              <DynamicFormPesawat />
            </FormToggle>
          </div>

          <div className="w-full px-5 pt-4">
            {pesawatData?.length === 0 ? (
              <p>Belum ada data pesawat.</p>
            ) : (
              pesawatData.map((p) => (
                <div
                  key={p.id}
                  className="p-2 flex mt-2 bg-white rounded-sm w-full border justify-between "
                >
                  <div>
                    <p className="font-semibold">{p.nama_pesawat}</p>
                    <p className="text-sm text-gray-600">
                      {p.kode_pesawat || "-"}
                    </p>
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await hapusPesawat(p.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="transition-all w-7 h-7 bg-primary focus:border-accent focus:bg-base hover:border-accent hover:border-2 focus:border-2 border-transparent rounded-full flex items-center justify-center"
                    >
                      <FiTrash className="text-secondary text-sm" />
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="sm:block hidden">
        <FormToggle data={pesawatDataRaw}>
          <DynamicFormPesawat />
        </FormToggle>
      </div>
    </>
  );
}
