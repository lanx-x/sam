import type { Locale, LocaleItem } from "@/i18n/config";
import { fetchStrapi } from "@/utils/strapi";
import type { PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceTreatment, Equipment, EquipmentCategory, CaseStudy, News, NewsCategory, Video, Material, MaterialCategory, Industry, Site, Navigation, Broadcast } from "cms-types";

export type { PageData };

export async function getPage(payload: { [key: string]: any }) {
  const { slug, ...params } = payload
  return fetchStrapi<StrapiCollectionResponse<PageData>>('/pages', {
    params: {
      'filters[slug][$eq]': slug.toLowerCase(),
      pLevel: true,
      ...params,
    },
    // next: { revalidate: 60 }
  });
}


export async function getPatternPages(payload: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<{ slug: string }>>('/pages', {
    params: {
      'filters[slug][$contains]': '{{id}}',
      'fields[0]': 'slug',
      ...payload,
    },
    next: { revalidate: 60 },
  });
}

export async function getSurfaceTreatment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<SurfaceTreatment>>('/surface-treatments', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
  })
}

export async function getEquipment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>('/equipments', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getEquipmentCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<EquipmentCategory>>('/equipment-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getCaseStudy(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<CaseStudy>>('/case-studies', {
    params: {
      pLevel: true,
      ...params,
    }
  })
}

export async function getNews(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<News>>('/news-items', {
    params: {
      pLevel: true,
      ...params,
    }
  })
}

export async function getNewsCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<NewsCategory>>('/news-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getVideo(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Video>>('/videos', {
    params: {
      pLevel: true,
      ...params,
    }
  })
}

export async function getMaterial(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Material>>('/materials', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getMaterialCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<MaterialCategory>>('/material-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getIndustry(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Industry>>('/industries', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    }
  })
}

export async function getSite(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiSingleResponse<Site>>('/site', {
    params: {
      pLevel: true,
      ...params,
    },
    // next: { revalidate: 3600 },
  })
}

export async function getNavigation(documentId: string, params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiSingleResponse<Navigation>>(`/navigations/${documentId}`, {
    params: {
      pLevel: true,
      ...params,
    },
  })
}

export async function getI18nLocales() {
  return fetchStrapi<LocaleItem[]>('/i18n/locales')
}

export async function getBroadcast(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Broadcast>>('/broadcasts', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
  })
}

export function createLocalizedApi(locale: Locale) {
  return {
    getPage: (payload: { [key: string]: any }) => getPage({ ...payload, locale }),
    getPatternPages: (payload: { [key: string]: any } = {}) => getPatternPages({ ...payload, locale }),
    getSurfaceTreatment: (params: { [key: string]: any } = {}) => getSurfaceTreatment({ ...params, locale }),
    getEquipment: (params: { [key: string]: any } = {}) => getEquipment({ ...params, locale }),
    getEquipmentCategory: (params: { [key: string]: any } = {}) => getEquipmentCategory({ ...params, locale }),
    getNews: (params: { [key: string]: any } = {}) => getNews({ ...params, locale }),
    getNewsCategory: (params: { [key: string]: any } = {}) => getNewsCategory({ ...params, locale }),
    getVideo: (params: { [key: string]: any } = {}) => getVideo({ ...params, locale }),
    getMaterial: (params: { [key: string]: any } = {}) => getMaterial({ ...params, locale }),
    getMaterialCategory: (params: { [key: string]: any } = {}) => getMaterialCategory({ ...params, locale }),
    getIndustry: (params: { [key: string]: any } = {}) => getIndustry({ ...params, locale }),
    getSite: (params: { [key: string]: any } = {}) => getSite({ ...params, locale }),
    getNavigation: (documentId: string, params: { [key: string]: any } = {}) => getNavigation(documentId, { ...params, locale }),
  };
}

export const globalApi = {
  getCaseStudy,
  getBroadcast,
  getI18nLocales,
};

export type LocalizedApi = ReturnType<typeof createLocalizedApi>;
export type GlobalApi = typeof globalApi;
