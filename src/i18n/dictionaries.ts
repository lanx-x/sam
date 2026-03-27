import en from "./dictionaries/en.json";
import cn from "./dictionaries/cn.json";
import type { Locale } from "./config";

export const dictionaries = {
  en,
  cn,
} as const;

export type Messages = (typeof dictionaries)[keyof typeof dictionaries];

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale] ?? dictionaries.en;
}
