import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { globalApi } from "@/api";
import { getDefaultLocale, isLocale } from "./config";

export async function handleI18nProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  console.log("###### pathname ", pathname)
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const localeList = await globalApi.getI18nLocales();
  const defaultLocale = getDefaultLocale(localeList);

  if (firstSegment && isLocale(firstSegment, localeList)) {
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

  console.log("######### rewrite to ", rewriteUrl.pathname)
  return NextResponse.rewrite(rewriteUrl);
}
