import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { globalApi } from "@/api";
import { getDefaultLocale, isLocale, type LocaleItem } from "./";

const LOCALE_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours
let localeListCache: { data: LocaleItem[]; ts: number } | null = null;

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

  const now = Date.now()
  if (!localeListCache || now - localeListCache.ts > LOCALE_CACHE_TTL) {
    localeListCache = { data: await globalApi.getI18nLocales(), ts: now };
  }
  const { data: localeList } = localeListCache
  const defaultLocale = getDefaultLocale(localeList);

  if (firstSegment && isLocale(firstSegment, localeList)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}/${pathname}`.replaceAll(/\/\//g, '/');
  return NextResponse.redirect(redirectUrl);
}
