import type { Core } from '@strapi/strapi';
import { sendInquiryNotification } from './utils/inquiry-email';

// These are referenced by `api::page.page` through a dynamiczone + component +
// relation path. rest-cache's `clearRelatedCache` only traverses `type: "component"`,
// not `type: "dynamiczone"`, so editing any of these would otherwise leave
// `/api/pages?*` stale for the full 7-day TTL.
const CONTENT_TYPES_AFFECTING_PAGES: ReadonlySet<string> = new Set([
  'api::ui-section.ui-section',
  'api::renderer.renderer',
  'api::action.action',
  'api::case-study.case-study',
  'api::industry.industry',
  'api::news.news',
  'api::material.material',
  'api::surface-treatment.surface-treatment',
  'api::equipment.equipment',
  'api::faq.faq',
]);

const READ_ACTIONS: ReadonlySet<string> = new Set(['findOne', 'findMany', 'count']);

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.customFields.register({
      name: 'char-count',
      type: 'string',
      inputSize: {
        default: 12,
        isResizable: true,
      },
    });

    strapi.documents.use(async (ctx: any, next: () => Promise<any>) => {
      const result = await next();

      if (!CONTENT_TYPES_AFFECTING_PAGES.has(ctx.uid)) return result;
      if (READ_ACTIONS.has(ctx.action)) return result;

      try {
        await strapi.plugin('rest-cache').service('cacheStore').clearByUid('api::page.page', {}, true);
        strapi.log.info(`[rest-cache] Cleared page cache due to ${ctx.action} on ${ctx.uid}`);
      } catch (err) {
        strapi.log.warn(`[rest-cache] Failed to clear page cache: ${(err as Error).message}`);
      }

      return result;
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const enqueueInquiryNotification = (inquiryId: number) => {
      setImmediate(async () => {
        try {
          await sendInquiryNotification(strapi, inquiryId);
          strapi.log.info(`[inquiry-email] Sent notification for inquiry ${inquiryId}.`);
        } catch (error) {
          strapi.log.error(`[inquiry-email] Failed to send notification for inquiry ${inquiryId}: ${(error as Error).message}`);
        }
      });
    };

    strapi.db.lifecycles.subscribe({
      models: ['api::inquiry.inquiry'],
      afterCreate(event) {
        const inquiryId = event.result?.id;
        if (typeof inquiryId !== 'number') return;
        enqueueInquiryNotification(inquiryId);
      },
    });

    strapi.server.use(async (ctx, next) => {
      await next();
    });
  },
};
