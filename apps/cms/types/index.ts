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

export type HomePageData = StrapiDocument<"api::home-page.home-page">;
export type PageData = StrapiDocument<"api::page.page">;
export type SurfaceFinishList = StrapiDocument<"api::surface-finish.surface-finish">;
export type EquipmentList = StrapiDocument<"api::equipment.equipment">;
export type EquipmentCategoryList = StrapiDocument<"api::equipment-category.equipment-category">;
export type CaseStudy = StrapiDocument<"api::case-study.case-study">;

export type CommonSection = StrapiComponent<"section.common-section">;
export type StorySection = StrapiComponent<"section.story-section">
export type SpeSection = StrapiComponent<"section.spe-section">
export type EquipmentSection = StrapiComponent<"section.equipment-section">
export type SurfaceFinishSection = StrapiComponent<"section.surface-finish-section">
export type PostSection = StrapiComponent<"section.post-section">
export type FAQSection = StrapiComponent<"section.faq-section">
export type IndustrySection = StrapiComponent<"section.industry-section">
