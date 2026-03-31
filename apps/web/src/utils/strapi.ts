import type { StaticImageData } from "next/image";

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
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
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(media: MediaLike) {
  if (!media) return null;
  if (typeof media === 'string' || (typeof media === 'object' && 'src' in media)) return media;
  const url = media.url || media.data?.attributes?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : getStrapiURL(url);
}

export async function fetchStrapi<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  // Build URL with query parameters
  const url = new URL(`${STRAPI_URL}/api${path.startsWith('/') ? path : `/${path}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const start = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  console.log(`[Strapi Request] [${requestId}] ${fetchOptions.method || 'GET'} ${url.toString()}`);

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...fetchOptions.headers,
      },
    });

    const duration = Date.now() - start;
    console.log(`[Strapi Response] [${requestId}] ${response.status} ${response.statusText} (${duration}ms)`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[Strapi Error] [${requestId}]`, errorData);
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[Strapi Network Error] [${requestId}] ${error} (${duration}ms)`);
    throw error;
  }
}
