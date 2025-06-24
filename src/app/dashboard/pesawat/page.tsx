import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
import FormToggle from "@/app/components/FormTogglePesawat";
import AlertErrorFromSearchParams from "@/app/components/AlertErrorFromSearchParams";
import ClientPesawatList from "@/app/components/ClientPesawatList"; // 👈 tambahkan ini

type Pesawat = {
  id: string;
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

  if (error) return <p>Error loading data: {error.message}</p>;

  const pesawatData = (pesawatDataRaw ?? []) as Pesawat[];

  return (
    <>
      <AlertErrorFromSearchParams />
      <div
        className="w-full sm:hidden flex-cols flex sm:flex-row"
        style={{ backgroundImage: "url('/image/bg/noise.webp')" }}
      >
        <div className="w-full">
          <div className="sm:hidden block">
            <FormToggle data={pesawatDataRaw}>
              <DynamicFormPesawat />
            </FormToggle>
          </div>

          <div className="w-full px-5 pt-4">
            <ClientPesawatList pesawatData={pesawatData} />
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
