import { factories } from "@strapi/strapi";

function hasContent(response: unknown) {
  if (!response || typeof response !== "object") {
    return false;
  }

  const data = (response as { data?: unknown }).data;

  if (Array.isArray(data)) {
    return data.length > 0;
  }

  return data != null;
}

export function createLocaleFallbackController(uid: string) {
  return factories.createCoreController(uid as any, ({ strapi }) => ({
    async find(ctx) {
      const requestedLocale = ctx.query?.locale;
      const response = await super.find(ctx);

      if (!requestedLocale || hasContent(response)) {
        return response;
      }

      delete ctx.query.locale;
      const fallbackResponse = await super.find(ctx);
      ctx.query.locale = requestedLocale;

      if (hasContent(fallbackResponse)) {
        strapi.log.info(`[i18n-fallback] ${uid} fell back from locale "${requestedLocale}" to default locale`);
      }

      return hasContent(fallbackResponse) ? fallbackResponse : response;
    },

    async findOne(ctx) {
      const requestedLocale = ctx.query?.locale;
      const response = await super.findOne(ctx);

      if (!requestedLocale || hasContent(response)) {
        return response;
      }

      delete ctx.query.locale;
      const fallbackResponse = await super.findOne(ctx);
      ctx.query.locale = requestedLocale;

      if (hasContent(fallbackResponse)) {
        strapi.log.info(`[i18n-fallback] ${uid} fell back from locale "${requestedLocale}" to default locale`);
      }

      return hasContent(fallbackResponse) ? fallbackResponse : response;
    },
  }));
}
