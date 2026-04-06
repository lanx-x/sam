import { defaultLocale } from "@/i18n";
import { fetchStrapi } from "@/utils/strapi";
import type { HomePageData, PageData, StrapiSingleResponse, StrapiCollectionResponse, SurfaceTreatment, Equipment, EquipmentCategory, CaseStudy, News, NewsCategory, Video, Material, MaterialCategory } from "cms-types";

export type { HomePageData, PageData };

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

export async function getSurfaceFinish(params: { [key: string]: any }) {
  return fetchStrapi<StrapiCollectionResponse<SurfaceTreatment>>('/surface-finishes', {
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
