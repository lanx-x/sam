import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS, type CacheTag } from "@/api";
import { logger } from "@/utils/logger";
import { REVALIDATE_SECRET } from "@/utils/env";

const TAG_BY_STRAPI_MODEL: Readonly<Record<string, CacheTag>> = {
  action: "action",
  actions: "action",
  application: "application",
  applications: "application",
  broadcast: "broadcast",
  broadcasts: "broadcast",
  "case-study": "case-study",
  "case-studies": "case-study",
  equipment: "equipment",
  equipments: "equipment",
  "equipment-category": "equipment-category",
  "equipment-categories": "equipment-category",
  faq: "faq",
  faqs: "faq",
  industry: "industry",
  industries: "industry",
  material: "material",
  materials: "material",
  "material-category": "material-category",
  "material-categories": "material-category",
  navigation: "navigation",
  navigations: "navigation",
  news: "news",
  "news-items": "news",
  "news-category": "news-category",
  "news-categories": "news-category",
  page: "page",
  pages: "page",
  renderer: "renderer",
  renderers: "renderer",
  site: "site",
  sites: "site",
  "surface-treatment": "surface-treatment",
  "surface-treatments": "surface-treatment",
  "ui-section": "ui-section",
  "ui-sections": "ui-section",
  video: "video",
  videos: "video",
  "quality-level": "quality-level",
  "quality-levels": "quality-level",
  locale: "i18n-locale",
  locales: "i18n-locale",
  "i18n-locale": "i18n-locale",
};

function getCacheTag(model: unknown): CacheTag | null {
  if (typeof model !== "string") return null;

  const normalized = model.trim().toLowerCase();
  const strapiUid = normalized.match(/^api::([^.]+)\./)?.[1];
  return TAG_BY_STRAPI_MODEL[normalized] ?? (strapiUid ? TAG_BY_STRAPI_MODEL[strapiUid] : null) ?? null;
}

function revalidateTags(tags: readonly CacheTag[]) {
  for (const tag of tags) {
    // Webhooks must expose the new CMS content on the next request.
    revalidateTag(tag, { expire: 0 });
  }
}

function clearAllCache() {
  revalidateTags(CACHE_TAGS);
  revalidatePath('/[locale]', 'layout');
}

export async function POST(request: NextRequest) {
  if (!REVALIDATE_SECRET) {
    logger.error("[Revalidate] REVALIDATE_SECRET not set");
    return NextResponse.json({ message: "REVALIDATE_SECRET not set" }, { status: 500 });
  }

  if (request.headers.get("authorization") !== `Bearer ${REVALIDATE_SECRET}`) {
    logger.warn("[Revalidate] Invalid token", request.headers.get("authorization"));
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.tag) {
      const requestedTags = [body.tag].flat();
      const tags = requestedTags.map(getCacheTag);
      if (tags.some((tag) => tag === null)) {
        logger.warn(`[Revalidate] Unknown tag: ${requestedTags.join(", ")}`);
        return NextResponse.json({ message: "Unknown cache tag" }, { status: 400 });
      }

      revalidateTags(tags as CacheTag[]);
      logger.info(`[Revalidate] Revalidated tags: ${tags.join(", ")}`);
      return NextResponse.json({ revalidated: true, tags });
    }

    // Strapi webhooks may send a singular name, REST plural name, or UID.
    if (body.model) {
      const tag = getCacheTag(body.model);
      if (tag) {
        revalidateTags([tag]);
        logger.info(`[Revalidate] Revalidated tag: ${tag} (from Strapi model ${body.model})`);
        return NextResponse.json({ revalidated: true, tag });
      }

      clearAllCache()
      logger.warn(`[Revalidate] Unknown model "${body.model}", revalidated all known tags`);
      return NextResponse.json({ revalidated: true, scope: "all" });
    }

    clearAllCache()
    logger.warn(`[Revalidate] No model in payload, revalidated all known tags`);
    return NextResponse.json({ revalidated: true, scope: "all" });
  } catch {
    logger.error("[Revalidate] Invalid request body");
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
}
