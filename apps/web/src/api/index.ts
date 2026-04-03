import { fetchStrapi } from "@/utils/strapi";
import type { HomePageData, PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceFinishList } from "cms-types";

export type { HomePageData, PageData };

export async function getHomePage(lang: string = 'en') {
  return fetchStrapi<StrapiSingleResponse<HomePageData>>('/home-page', {
    params: {
      locale: lang,
      pLevel: true
    },
    next: { revalidate: 60 }
  });
}

export async function getPage(slug: string, lang: string = 'en') {
  return fetchStrapi<StrapiCollectionResponse<PageData>>('/pages', {
    params: {
      'filters[slug][$eq]': slug.toLowerCase(),
      locale: lang,
      pLevel: true
    },
    next: { revalidate: 60 }
  });
}


export async function getSurfaceFinish(lang: string = 'en') {
  return fetchStrapi<StrapiCollectionResponse<SurfaceFinishList>>('/surface-finishes', {
    params: {
      locale: lang,
      pLevel: true,
      'pagination[pageSize]': 100
    },
  })
}
