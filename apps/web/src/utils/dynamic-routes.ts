import { createLocalizedApi } from "@/api";

type ApiClient = ReturnType<typeof createLocalizedApi>;

export type DynamicRouteItem = {
  documentId?: string | null;
  label?: string | null;
  title?: string | null;
  name?: string | null;
  detailPageTitle?: string | null;
  updatedAt?: string | Date | null;
  publishedAt?: string | Date | null;
};

export type DynamicRouteType =
  | "application"
  | "news"
  | "equipment"
  | "material"
  | "caseStudy"
  | "surfaceTreatment"
  | "industry";

type DynamicRouteConfig = {
  patternPrefix: string;
  getLabels: (item: DynamicRouteItem) => Array<string | null | undefined>;
  fetch: (api: ApiClient) => Promise<{ data: DynamicRouteItem[] }>;
};

export const DYNAMIC_ROUTE_CONFIGS: Record<DynamicRouteType, DynamicRouteConfig> = {
  application: {
    patternPrefix: "/solutions/application/",
    getLabels: (item) => [item.label, item.name],
    fetch: (api) => api.getApplication({ 'pagination[pageSize]': 200 }),
  },
  news: {
    patternPrefix: "/resources/news/",
    getLabels: (item) => [item.title],
    fetch: (api) => api.getNews({ 'pagination[pageSize]': 200 }),
  },
  equipment: {
    patternPrefix: "/resources/equipment/",
    getLabels: (item) => [item.name],
    fetch: (api) => api.getEquipment({ 'pagination[pageSize]': 200 }),
  },
  material: {
    patternPrefix: "/resources/material/",
    getLabels: (item) => [item.name],
    fetch: (api) => api.getMaterial({ 'pagination[pageSize]': 200 }),
  },
  caseStudy: {
    patternPrefix: "/resources/case-study/",
    getLabels: (item) => [item.title],
    fetch: (api) => api.getCaseStudy({ 'pagination[pageSize]': 200 }),
  },
  surfaceTreatment: {
    patternPrefix: "/solutions/surface-treatment/",
    getLabels: (item) => [item.name],
    fetch: (api) => api.getSurfaceTreatment({ 'pagination[pageSize]': 200 }),
  },
  industry: {
    patternPrefix: "/solutions/industry/",
    getLabels: (item) => [item?.label, item?.name],
    fetch: (api) => api.getIndustryNavigation(),
  },
};

export function slugifyDynamicSegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDynamicRouteTypeFromPattern(
  patternSlug: string
): DynamicRouteType | null {
  return (
    (Object.entries(DYNAMIC_ROUTE_CONFIGS).find(([, config]) =>
      patternSlug.startsWith(config.patternPrefix)
    )?.[0] as DynamicRouteType | undefined) ?? null
  );
}

export function getDynamicRouteTypeFromPath(path: string): DynamicRouteType | null {
  return (
    (Object.entries(DYNAMIC_ROUTE_CONFIGS).find(([, config]) =>
      path.includes(config.patternPrefix)
    )?.[0] as DynamicRouteType | undefined) ?? null
  );
}

export function getDynamicItemSegment(
  type: DynamicRouteType,
  item: DynamicRouteItem
): string {
  for (const raw of DYNAMIC_ROUTE_CONFIGS[type].getLabels(item)) {
    if (typeof raw === "string") {
      const slug = slugifyDynamicSegment(raw);
      if (slug) return slug;
    }
  }

  return item?.documentId ?? "";
}

function getDynamicItemAliasSegments(
  type: DynamicRouteType,
  item: DynamicRouteItem
): string[] {
  const aliases = DYNAMIC_ROUTE_CONFIGS[type].getLabels(item)
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .map(slugifyDynamicSegment)
    .filter(Boolean);

  return Array.from(new Set(aliases));
}

export function matchDynamicItemIdentifier(
  type: DynamicRouteType,
  item: DynamicRouteItem,
  identifier: string
): boolean {
  if (item.documentId === identifier) {
    return true;
  }

  return getDynamicItemAliasSegments(type, item).includes(identifier);
}

export function buildDynamicDetailPath(
  locale: string,
  type: DynamicRouteType,
  item: DynamicRouteItem
): string {
  return `/${locale}${DYNAMIC_ROUTE_CONFIGS[type].patternPrefix}${getDynamicItemSegment(type, item)}`;
}

export function buildDynamicDetailPathFromBase(
  basePath: string,
  type: DynamicRouteType,
  item: DynamicRouteItem
): string {
  return `${basePath}/${getDynamicItemSegment(type, item)}`.replaceAll(/\/\/+/g, "/");
}

export async function findDynamicRouteItem(
  api: ApiClient,
  type: DynamicRouteType,
  identifier: string
): Promise<DynamicRouteItem | null> {
  const { data } = await DYNAMIC_ROUTE_CONFIGS[type].fetch(api);
  return data.find((item) => matchDynamicItemIdentifier(type, item, identifier)) ?? null;
}

export async function findDynamicRouteItemByDocumentId(
  api: ApiClient,
  type: DynamicRouteType,
  documentId: string
): Promise<DynamicRouteItem | null> {
  const { data } = await DYNAMIC_ROUTE_CONFIGS[type].fetch(api);
  return data.find((item) => item.documentId === documentId) ?? null;
}
