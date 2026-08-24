import type { Locale, LocaleItem } from "@/i18n";
import { NODE_ENV, ENABLE_MULTILANG } from "@/utils/env";
import { fetchStrapi } from "@/utils/strapi";
import type { PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceTreatment, Equipment, EquipmentCategory, CaseStudy, News, NewsCategory, Video, Material, MaterialCategory, Industry, Site, Navigation, Broadcast } from "cms-types";

export type { PageData };

const isDev = NODE_ENV === 'development'
// const isDev = false

// 开发环境兼用缓存, 其他环境设置无限长的缓存时间(通过 webhook 刷新缓存)
const revalidate = {
  short: isDev ? 0 : 60 * 5,
  normal: isDev ? 0 : 60 * 5,
  long: isDev ? 0 : 60 * 5,
  static: isDev ? 0 : 60 * 5,
} as const

// 列表级 populate 配置（动态 zone 和各列表 API 共用）
const listPopulate = {
  caseStudy: {
    image: true,
    parameter: { populate: '*' },
    industry: { fields: ['name'] },
  },
  equipment: {
    image: true,
    parameter: { populate: '*' },
    category: { fields: ['documentId'] },
  },
  surfaceTreatment: {
    icon: true,
    materials: {
      fields: ['name'],
      populate: { category: { fields: ['documentId', 'name'] } },
    },
    featured_faqs: true,
  },
  news: {
    image: true,
    category: { fields: ['documentId'] },
    seo: true,
  },
  material: {
    icon: true,
    parameter: { populate: '*' },
    category: { fields: ['documentId', 'name'] },
    strength: { fields: ['name'] },
    processability: { fields: ['name'] },
    corrosion_resistance: { fields: ['name'] },
    featured_faqs: true,
  },
  industry: {
    image: true,
    case_studies: {
      populate: {
        image: true,
        parameter: { populate: '*' },
        industry: { fields: ['name'] },
      },
    },
  },
} as const

export const KNOWN_CACHE_TAGS = new Set([
  "page",
  "ui-section",
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
  const p: any = {
    pLevel: true,
    ...params,
  }
  if (slug) {
    p['filters[slug][$eq]'] = slug.toLowerCase()
  }

  return fetchStrapi<StrapiCollectionResponse<PageData>>('/pages', {
    params: p,
    next: { revalidate: revalidate.short, tags: ["page", "material", "news", "case-study", "industry", "equipment", "surface-treatment", "ui-section"] }
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
      populate: listPopulate.surfaceTreatment,
      'pagination[pageSize]': 100,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["surface-treatment", "material", "news"] },
  })
}

export async function getSurfaceTreatmentDetail(params: { [key: string]: any }) {
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
        featured_news: {
          fields: ['title', 'documentId', 'content'],
          populate: { image: true },
        },
      },
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["surface-treatment", "material", "news"] },
  })
}

export async function getEquipment(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>('/equipments', {
    params: {
      populate: listPopulate.equipment,
      'pagination[pageSize]': 100,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["equipment", "equipment-category", "news"] },
  })
}

export async function getEquipmentDetail(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>('/equipments', {
    params: {
      populate: {
        image: true,
        extra_images: true,
        parameter: { populate: '*' },
      },
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["equipment", "equipment-category", "news"] },
  })
}

export async function getEquipmentCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<EquipmentCategory>>('/equipment-categories', {
    params: {
      'pagination[pageSize]': 100,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["equipment-category", "equipment"] },
  })
}

export async function getCaseStudy(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<CaseStudy>>('/case-studies', {
    params: {
      populate: listPopulate.caseStudy,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["case-study", "industry"] },
  })
}

export async function getCaseStudyDetail(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<CaseStudy>>('/case-studies', {
    params: {
      populate: {
        image: true,
        extra_images: true,
        parameter: { populate: '*' },
        industry: { fields: ['name'] },
        seo: true,
      },
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["case-study", "industry"] },
  })
}

export async function getNews(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<News>>('/news-items', {
    params: {
      populate: listPopulate.news,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["news", "news-category"] },
  })
}

export async function getNewsCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<NewsCategory>>('/news-categories', {
    params: {
      populate: { image: true },
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["news-category", "news"] },
  })
}

export async function getVideo(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Video>>('/videos', {
    params: {
      populate: {
        internal: { populate: '*' },
        overwrite_meta: { populate: '*' },
      },
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',

      ...params,
    },
    next: { revalidate: revalidate.short, tags: ["video"] },
  })
}

export async function getMaterial(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Material>>('/materials', {
    params: {
      populate: listPopulate.material,
      'pagination[pageSize]': 100,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["material", "material-category", "surface-treatment", "industry", "news"] },
  })
}

export async function getMaterialDetail(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Material>>('/materials', {
    params: {
      populate: {
        icon: true,
        image: true,
        parameter: { populate: '*' },
        specification: { populate: '*' },
        pros: { populate: '*' },
        cons: { populate: '*' },
        category: { fields: ['documentId', 'name'] },
        strength: { fields: ['name'] },
        processability: { fields: ['name'] },
        corrosion_resistance: { fields: ['name'] },
        surface_treatments: {
          populate: { icon: true },
          fields: ['name', 'desc', 'documentId'],
        },
        industries: {
          fields: ['documentId', 'name'],
          populate: { image: true },
        },
        featured_news: {
          fields: ['title', 'documentId', 'content'],
          populate: { image: true },
        },
      },
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["material", "material-category", "surface-treatment", "industry", "news"] },
  })
}

export async function getMaterialCategory(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<MaterialCategory>>('/material-categories', {
    params: {
      'pagination[pageSize]': 100,
      'sort[0]': 'order:desc',
      'sort[1]': 'id:desc',
      ...params,
    },
    next: { revalidate: revalidate.static, tags: ["material-category", "material"] },
  })
}

export async function getIndustry(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Industry>>('/industries', {
    params: {
      populate: listPopulate.industry,
      'pagination[pageSize]': 100,
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["industry", "material", "case-study"] },
  })
}

export async function getIndustryDetail(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<Industry>>('/industries', {
    params: {
      populate: {
        image: true,
        detailPageBanner: true,
        detailPageFeatures: { populate: '*' },
      },
      ...params,
    },
    next: { revalidate: revalidate.normal, tags: ["industry", "material"] },
  })
}

export async function getSite(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiSingleResponse<Site>>('/site', {
    params: {
      populate: {
        logo: true,
        logo_with_text: true,
        email: { populate: '*' },
        tel: { populate: '*' },
        fax: { populate: '*' },
        mobile: { populate: '*' },
        address: { populate: '*' },
        social: { populate: '*' },
        display_text: { populate: '*' },
      },
      ...params,
    },
    next: { revalidate: revalidate.long, tags: ["site"] },
  })
}

export async function getNavigation(params: { [key: string]: any } = {}) {
  return fetchStrapi<StrapiCollectionResponse<Navigation>>(`/navigations`, {
    params: {
      populate: {
        value: {
          populate: {
            image: true,
            featured_news: { fields: ['title', 'documentId'] },
            target_page: { fields: ['slug'] },
            children: {
              populate: {
                icon: true,
                alt_icon: true,
                image: true,
                target_page: { fields: ['slug'] },
                children: {
                  populate: {
                    icon: true,
                    alt_icon: true,
                    target_page: { fields: ['slug'] },
                    industry: { fields: ['documentId', 'name', 'detailPageTitle'] },
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
  const locales = await fetchStrapi<LocaleItem[]>('/i18n/locales', {
    next: { revalidate: revalidate.static, tags: ["i18n-locale"] },
  })

  return ENABLE_MULTILANG === 'true' ? locales : locales.filter(xs => xs.code === 'en')
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

export function createLocalizedApi(locale: Locale) {
  return {
    getPage: bindLocale(locale, getPage, {} as { [key: string]: any }),
    getPatternPages: bindLocale(locale, getPatternPages, {}),
    getSurfaceTreatment: bindLocale(locale, getSurfaceTreatment, {}),
    getSurfaceTreatmentDetail: bindLocale(locale, getSurfaceTreatmentDetail, {}),
    getEquipment: bindLocale(locale, getEquipment, {}),
    getEquipmentDetail: bindLocale(locale, getEquipmentDetail, {}),
    getEquipmentCategory: bindLocale(locale, getEquipmentCategory, {}),
    getNews: bindLocale(locale, getNews, {}),
    getNewsCategory: bindLocale(locale, getNewsCategory, {}),
    getVideo: bindLocale(locale, getVideo, {}),
    getMaterial: bindLocale(locale, getMaterial, {}),
    getMaterialDetail: bindLocale(locale, getMaterialDetail, {}),
    getMaterialCategory: bindLocale(locale, getMaterialCategory, {}),
    getIndustry: bindLocale(locale, getIndustry, {}),
    getIndustryDetail: bindLocale(locale, getIndustryDetail, {}),
    getSite: bindLocale(locale, getSite, {}),
    getNavigation: bindLocale(locale, getNavigation, {}),
    getCaseStudy: bindLocale(locale, getCaseStudy, {}),
    getCaseStudyDetail: bindLocale(locale, getCaseStudyDetail, {}),
    getBroadcast: bindLocale(locale, getBroadcast, {}),
  };
}

export const globalApi = {
  getI18nLocales,
};

export type LocalizedApi = ReturnType<typeof createLocalizedApi>;
export type GlobalApi = typeof globalApi;
