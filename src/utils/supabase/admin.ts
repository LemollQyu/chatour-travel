import { createServerClient } from "@supabase/ssr";

export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE!, // Gunakan key ini dengan hati-hati
    {
      cookies: {
        getAll() {
          return []; // Tidak perlu cookie untuk service_role
        },
        setAll() {
          // Tidak perlu set cookie untuk service_role
        },
      },
    }
  );
}
