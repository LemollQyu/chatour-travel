import { createClient } from "@/utils/supabase/server";
import NavigasiClient from "./ClientNavigasi";

export default async function Navigasi() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavigasiClient user={user} />;
}
