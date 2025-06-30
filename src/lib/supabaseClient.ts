import { createClient } from "@/utils/supabase/client";

// hanya dibuat sekali
export const supabase = createClient();
