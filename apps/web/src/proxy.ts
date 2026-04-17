import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleI18nProxy } from "./i18n/middleware";
import { logger } from "./utils/logger";
import { STRAPI_API_URL } from "./utils/env";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  logger.debug("[proxy]", `request from: ${request.nextUrl.href}`)
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/proxy-via-next/')) {
    const proxyPath = pathname.replace('/proxy-via-next', '');
    const url = new URL(proxyPath + request.nextUrl.search, STRAPI_API_URL);
    logger.debug("[proxy]", `rewrite to: ${url.toString()}`)
    return NextResponse.rewrite(url);
  }

  return handleI18nProxy(request);
}

export const config = {
  matcher: ["/", "/proxy-via-next/:path*", "/((?!_next|api).*)"],
};
