import type { Modules, UID } from "@strapi/strapi";
import type { } from "./generated/components";
import type { } from "./generated/contentTypes";

export type StrapiComponent<TUID extends UID.Component> =
  Modules.Documents.GetValues<TUID>;

export type StrapiDocument<
  TUID extends UID.ContentType,
  TParams extends Modules.Documents.Params.Pick<TUID, "fields" | "populate"> = never,
> = Modules.Documents.Document<TUID, TParams>;

export type StrapiResult<
  TUID extends UID.ContentType,
  TParams extends Modules.Documents.Params.Pick<TUID, "fields" | "populate"> = never,
> = Modules.Documents.Result<TUID, TParams>;

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, never>;
};

export type PageData = StrapiDocument<"api::page.page">;

export type SurfaceTreatment = StrapiDocument<"api::surface-treatment.surface-treatment">;
export type Equipment = StrapiDocument<"api::equipment.equipment">;
export type EquipmentCategory = StrapiDocument<"api::equipment-category.equipment-category">;
export type CaseStudy = StrapiDocument<"api::case-study.case-study">;
export type News = StrapiDocument<"api::news.news">;
export type NewsCategory = StrapiDocument<"api::news-category.news-category">;
export type Video = StrapiDocument<"api::video.video">;
export type Material = StrapiDocument<"api::material.material">;
export type MaterialCategory = StrapiDocument<"api::material-category.material-category">;
export type Industry = StrapiDocument<"api::industry.industry">;
export type Site = StrapiDocument<"api::site.site">;

export type Navigation = StrapiDocument<"api::navigation.navigation">;

export type CommonSection = StrapiComponent<"section.common-section">;
