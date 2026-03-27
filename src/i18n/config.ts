export const locales = ["en", "cn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizePath(locale: Locale, path: string) {
  if (locale === defaultLocale) {
    return path === "" ? "/" : path;
  }

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
