import en from "./dictionaries/en.json";
import cn from "./dictionaries/cn.json";

export const dictionaries = {
  en,
  cn,
} as const;

export type Messages = (typeof dictionaries)[keyof typeof dictionaries];

export async function getDictionary(locale: string): Promise<Messages> {
  return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en;
}
