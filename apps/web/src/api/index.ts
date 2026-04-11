import type { Locale, LocaleItem } from "@/i18n";
import { fetchStrapi } from "@/utils/strapi";
import type { PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceTreatment, Equipment, EquipmentCategory, CaseStudy, News, NewsCategory, Video, Material, MaterialCategory, Industry, Site, Navigation, Broadcast } from "cms-types";

export type { PageData };

const revalidate = {
  disabled: false,
  short: false,
  normal: false,
  long: false,
  static: false,
} as const

export const KNOWN_CACHE_TAGS = new Set([
  "page",
  "broadcast",
  "site",
  "navigation",
  "surface-treatment",
  "equipment",
  "equipment-category",
  "case-study",
  "news",
  "news-category",
  "video",
  "material",
  "material-category",
  "industry",
  "i18n-locale",
])

export async function getPage(payload: { [key: string]: any }) {
  const { slug, ...params } = payload
  return fetchStrapi<StrapiCollectionResponse<PageData>>('/pages', {
    params: {
      'filters[slug][$eq]': slug.toLowerCase(),
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.short, tags: ["page"] }
  });
}


export async function getPatternPages(payload: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<{ slug: string }>>('/pages', {
    params: {
      'filters[slug][$contains]': '{{id}}',
      'fields[0]': 'slug',
      ...payload,
    },
    next: { revalidate: revalidate.static, tags: ["page"] },
  });
}

export async function getSurfaceTreatment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<SurfaceTreatment>>('/surface-treatments', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["surface-treatment"] },
  })
}

export async function getEquipment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>('/equipments', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["equipment"] },
  })
}

export async function getEquipmentCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<EquipmentCategory>>('/equipment-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["equipment-category"] },
  })
}

export async function getCaseStudy(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<CaseStudy>>('/case-studies', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ['case-study'] },
  })
}

export async function getNews(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<News>>('/news-items', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["news"] },
  })
}

export async function getNewsCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<NewsCategory>>('/news-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["news-category"] },
  })
}

export async function getVideo(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Video>>('/videos', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.short, tags: ["video"] },
  })
}

export async function getMaterial(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Material>>('/materials', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["material"] },
  })
}

export async function getMaterialCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<MaterialCategory>>('/material-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["material-category"] },
  })
}

export async function getIndustry(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Industry>>('/industries', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["industry"] },
  })
}

export async function getSite(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiSingleResponse<Site>>('/site', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.long, tags: ["site"] },
  })
}

export async function getNavigation(documentId: string, params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiSingleResponse<Navigation>>(`/navigations/${documentId}`, {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.long, tags: ["navigation"] },
  })
}

export async function getI18nLocales() {
  return fetchStrapi<LocaleItem[]>('/i18n/locales', {
    next: { revalidate: revalidate.static, tags: ["i18n-locale"] },
  })
}

export async function getBroadcast(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Broadcast>>('/broadcasts', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["broadcast"] },
  })
}

function bindLocale<TParams extends { [key: string]: any }, TResult>(
  locale: Locale,
  apiFn: (params: TParams) => TResult,
  defaultParams: TParams,
) {
  return (params: TParams = defaultParams) => apiFn({ ...params, locale });
}

function bindLocaleForDocument<TParams extends { [key: string]: any }, TResult>(
  locale: Locale,
  apiFn: (documentId: string, params?: TParams) => TResult,
  defaultParams: TParams,
) {
  return (documentId: string, params: TParams = defaultParams) => apiFn(documentId, { ...params, locale });
}

export function createLocalizedApi(locale: Locale) {
  return {
    getPage: bindLocale(locale, getPage, {} as { [key: string]: any }),
    getPatternPages: bindLocale(locale, getPatternPages, {}),
    getSurfaceTreatment: bindLocale(locale, getSurfaceTreatment, {}),
    getEquipment: bindLocale(locale, getEquipment, {}),
    getEquipmentCategory: bindLocale(locale, getEquipmentCategory, {}),
    getNews: bindLocale(locale, getNews, {}),
    getNewsCategory: bindLocale(locale, getNewsCategory, {}),
    getVideo: bindLocale(locale, getVideo, {}),
    getMaterial: bindLocale(locale, getMaterial, {}),
    getMaterialCategory: bindLocale(locale, getMaterialCategory, {}),
    getIndustry: bindLocale(locale, getIndustry, {}),
    getSite: bindLocale(locale, getSite, {}),
    getNavigation: bindLocaleForDocument(locale, getNavigation, {}),
    getCaseStudy: bindLocale(locale, getCaseStudy, {}),
    getBroadcast: bindLocale(locale, getBroadcast, {}),
  };
}

export const globalApi = {
  getI18nLocales,
};

export type LocalizedApi = ReturnType<typeof createLocalizedApi>;
export type GlobalApi = typeof globalApi;
