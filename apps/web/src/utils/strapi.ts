import type { StaticImageData } from "next/image";
import qs from "qs";
import { logger } from "./logger";
import { STRAPI_API_URL, STRAPI_API_TOKEN } from "./env";

interface FetchOptions extends RequestInit {
  params?: Record<string, unknown>;
}

type MediaLike =
  | string
  | StaticImageData
  | {
    url?: string | null;
    data?: {
      url?: string | null;
      attributes?: {
        url?: string | null;
      } | null;
    } | null;
  }
  | null
  | undefined;

export function getStrapiURL(path = "") {
  return `${STRAPI_API_URL}${path}`;
}

export function getStrapiMedia(media: MediaLike) {
  if (!media) return null;
  if (typeof media === 'string' || (typeof media === 'object' && 'src' in media)) return media;
  const url = media.url || media.data?.attributes?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `/proxy-via-next${url}`;
}

export async function fetchStrapi<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(`${STRAPI_API_URL}/api${path.startsWith('/') ? path : `/${path}`}`);
  if (params) {
    url.search = qs.stringify(params);
  }

  const start = Date.now();

  logger.debug(`[Strapi] ${fetchOptions.method || 'GET'} ${url.toString()}`);

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
        ...fetchOptions.headers,
      },
    });

    const duration = Date.now() - start;
    logger.debug(`[Strapi] ${response.status} ${duration}ms ${url.pathname}${url.search}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error(`[Strapi]`, errorData);
      const err = new Error(`Strapi request failed: ${response.statusText}`) as Error & { data: unknown };
      err.data = errorData;
      throw err;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error(`[Strapi] ${error} (${duration}ms)`);
    throw error;
  }
}
