import { createClient } from "@/utils/supabase/server";
import ClientDashboard from "../components/ClientDashboard";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const username = user?.identities?.[0]?.identity_data?.username ?? null;

  return (
    <>
      <ClientDashboard user={user} />
    </>
  );
}
