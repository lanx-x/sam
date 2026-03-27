const locales = {
  en: () => import('./en.json').then(module => module.default),
  cn: () => import('./cn.json').then(module => module.default),
}

export type Locale = keyof typeof locales
export const defaultLocale = 'en'

export function isLocale(value: string): value is Locale {
  return Object.keys(locales).includes(value)
}

// export const getTrans = async (locale: keyof typeof translations) => translations[locale]()
