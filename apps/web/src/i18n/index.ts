export type Locale = string;

export type LocaleItem = {
  id: number;
  code: string;
  name: string;
  isDefault?: boolean;
};

export function getDefaultLocale(localeList: LocaleItem[]): Locale {
  return localeList.find((locale) => locale.isDefault)?.code ?? localeList[0]?.code ?? "en";
}

export function isLocale(value: string, localeList: LocaleItem[]): value is Locale {
  return localeList.some((locale) => locale.code === value);
}

export function getLocale(value: string, localeList: LocaleItem[]): Locale {
  return isLocale(value, localeList) ? value : getDefaultLocale(localeList);
}

export function localizePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}/${path}`.replaceAll(/\/\//g, '/');
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripLocaleFromPath(pathname: string, localeList: LocaleItem[]) {
  const localeCodes = localeList
    .map((locale) => locale.code)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  if (!localeCodes.length) {
    return pathname;
  }

  const pattern = new RegExp(`^/(?:${localeCodes.join("|")})(?=/|$)`);
  return pathname.replace(pattern, "");
}
