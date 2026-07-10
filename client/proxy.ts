// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
      const pathname = request.nextUrl.pathname;

      const sessionToken = request.cookies.get("better-auth.session_token");
      const isLoggedIn = !!sessionToken;

      if (
            pathname.startsWith("/auth/login") ||
            pathname.startsWith("/auth/register")
      ) {
            if (isLoggedIn) {
                  return NextResponse.redirect(
                        new URL("/dashboard", request.url),
                  );
            }
            return NextResponse.next();
      }

      if (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/settings")
      ) {
            if (!isLoggedIn) {
                  const loginUrl = new URL("/auth/login", request.url);
                  loginUrl.searchParams.set("callbackUrl", pathname);
                  return NextResponse.redirect(loginUrl);
            }
            return NextResponse.next();
      }

      return NextResponse.next();
}

export const config = {
      matcher: [
            "/dashboard/:path*",
            "/settings/:path*",
            "/auth/login",
            "/auth/register",
      ],
};
