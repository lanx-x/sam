import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "./config";

export function handleI18nProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isLocale(firstSegment)) {
    if (firstSegment === defaultLocale) {
      const redirectUrl = request.nextUrl.clone();
      const normalizedPath = segments.slice(1).join("/");
      redirectUrl.pathname = normalizedPath === "" ? "/" : `/${normalizedPath}`;
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}
