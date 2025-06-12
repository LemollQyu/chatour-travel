import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase signOut error", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
  } catch (err) {
    console.error("Logout route error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
