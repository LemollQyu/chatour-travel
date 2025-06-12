import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Panggil getUser()
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Kalau error refresh token invalid atau expired
    if (
      error.message.includes("refresh token") ||
      error.message.includes("expired") ||
      error.message.includes("Invalid")
    ) {
      // Hapus semua cookie Supabase yang ada
      supabaseResponse.cookies.delete("sb-access-token");
      supabaseResponse.cookies.delete("sb-refresh-token");
      supabaseResponse.cookies.delete("sb-provider-token");

      // Redirect ke login supaya user login ulang
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  const user = data.user;

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/registrasi") &&
    !request.nextUrl.pathname.startsWith("/lupa-password") &&
    !request.nextUrl.pathname.startsWith("/reset-password") &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    // kalau gak ada user dan bukan di halaman login dan sejenisnya, redirect ke login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
