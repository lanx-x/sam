import type { NextRequest } from "next/server";
import { handleI18nProxy } from "./i18n/middleware";

export async function proxy(request: NextRequest) {
  return handleI18nProxy(request);
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"],
};
