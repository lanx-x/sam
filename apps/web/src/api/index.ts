import type { Locale, LocaleItem } from "@/i18n";
import { fetchStrapi } from "@/utils/strapi";
import type { PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceTreatment, Equipment, EquipmentCategory, CaseStudy, News, NewsCategory, Video, Material, MaterialCategory, Industry, Site, Navigation, Broadcast } from "cms-types";

export type { PageData };

const isDev = process.env.NODE_ENV === 'development'

// 开发环境兼用缓存, 其他环境设置无限长的缓存时间(通过 webhook 刷新缓存)
const revalidate = {
  short: isDev ? 0 : 60 * 60 * 24 * 7,
  normal: isDev ? 0 : 60 * 60 * 24 * 7,
  long: isDev ? 0 : 60 * 60 * 24 * 7,
  static: isDev ? 0 : 60 * 60 * 24 * 7,
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
    next: { revalidate: revalidate.short, tags: ["page", "material", "news", "case-study", "industry", "equipment", "surface-treatment"] }
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
      populate: {
        icon: true,
        image: true,
        extend: { populate: '*' },
        materials: { fields: ['name'] },
        pros: { populate: '*' },
        cons: { populate: '*' },
        notes: { populate: '*' },
        featured_news: { fields: ['title', 'documentId'] },
      },
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["surface-treatment", "material", "news"] },
  })
}

export async function getEquipment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>('/equipments', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["equipment", "equipment-category", "news"] },
  })
}

export async function getEquipmentCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<EquipmentCategory>>('/equipment-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["equipment-category", "equipment"] },
  })
}

export async function getCaseStudy(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<CaseStudy>>('/case-studies', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["case-study", "industry"] },
  })
}

export async function getNews(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<News>>('/news-items', {
    params: {
      pLevel: true,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["news", "news-category"] },
  })
}

export async function getNewsCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<NewsCategory>>('/news-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["news-category", "news"] },
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
    next: { revalidate: revalidate.normal, tags: ["material", "material-category", "surface-treatment", "industry", "news"] },
  })
}

export async function getMaterialCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<MaterialCategory>>('/material-categories', {
    params: {
      pLevel: true,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["material-category", "material"] },
  })
}

export async function getIndustry(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Industry>>('/industries', {
    params: {
      pLevel: 10,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["industry", "material"] },
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
      populate: {
        value: {
          populate: {
            image: true,
            featured_news: { fields: ['title', 'documentId'] },
            children: {
              populate: {
                icon: true,
                image: true,
                target_page: { fields: ['slug'] },
                children: {
                  populate: {
                    icon: true,
                    target_page: { fields: ['slug'] },
                    industry: { fields: ['documentId'] },
                  },
                },
              },
            },
          },
        },
        action: true,
      },
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
