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
// export type HeroSectionData = StrapiComponent<"section.hero-section">;
// export type CapSectionData = StrapiComponent<"section.cap-section">;
// export type StatItemData = StrapiComponent<"item.stat-item">;
// export type HeroItemData = StrapiComponent<"ui.slogon-item">;
// export type CapItemData = StrapiComponent<"ui.cap-item">;
