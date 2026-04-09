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

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const localeList = await globalApi.getI18nLocales();
  const defaultLocale = getDefaultLocale(localeList);

  if (firstSegment && isLocale(firstSegment, localeList)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}/${pathname}`.replaceAll(/\/\//g, '/');
  return NextResponse.redirect(redirectUrl);
}
