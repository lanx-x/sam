// import "server-only";

import { cache } from "react";
import { notFound } from "next/navigation";
import { globalApi } from "@/api";
import { getDefaultLocale, isLocale, getLocale, type LocaleItem } from "./";

export const getRuntimeLocale = (async (routeLocale: string) => {
  const localeList = await globalApi.getI18nLocales();

  if (!isLocale(routeLocale, localeList)) {
    notFound();
  }

  const defaultLocale = getDefaultLocale(localeList);
  const locale = getLocale(routeLocale, localeList);

  return {
    locale,
    localeList,
    defaultLocale,
  };
});
