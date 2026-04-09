import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleI18nProxy } from "./i18n/middleware";
import { logger } from "./utils/logger";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/proxy-via-next/')) {
    const proxyPath = pathname.replace('/proxy-via-next', '');
    const url = new URL(proxyPath + request.nextUrl.search, STRAPI_URL);
    return NextResponse.rewrite(url);
  }

  return handleI18nProxy(request);
}

export const config = {
  matcher: ["/", "/proxy-via-next/:path*", "/((?!_next|api|.*\\..*).*)"],
};
