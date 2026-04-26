import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up", "/forgot-password", "/reset-password", "/verify-email"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublic =
    PUBLIC_ROUTES.some(route => pathname === route) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|webp|woff2?)$/);

  if (isPublic) return NextResponse.next();

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: { cookie: request.headers.get("cookie") ?? "" },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};