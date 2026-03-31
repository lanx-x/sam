import { fetchStrapi } from "@/utils/strapi";
import type { HomePageData, StrapiSingleResponse } from "cms-types";

export type { HomePageData };

export async function getHomePage(lang: string = 'en') {
  return fetchStrapi<StrapiSingleResponse<HomePageData>>('/home-page', {
    params: {
      locale: lang,
      pLevel: true
    },
    next: { revalidate: 60 }
  });
}
