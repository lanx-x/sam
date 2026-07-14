import type { Core } from '@strapi/strapi';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'strapi-v5-plugin-populate-deep': {
    config: {
      // defaultDepth: 10, // Default is 5
    }
  },
  oembed: {
    enabled: true,
  },
  email: {
    enabled: false,
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 31536000000, // 1 year in ms (koa-static option)
        },
      },
    },
  },
  'rest-cache': {
    config: {
      provider: {
        name: 'memory',
        getTimeout: 500,
        options: {
          maxSize: 32767,
        },
      },
      strategy: {
        // 7 days TTL (provider converts seconds -> ms internally)
        maxAge: SEVEN_DAYS_IN_SECONDS,
        resetOnStartup: true,
        // Cache responses even when Authorization header or Cookie is present
        hitpass: false,
        // Purge related contentTypes' cache when one changes
        clearRelatedCache: true,
        enableEtag: true,
        enableXCacheHeaders: true,
        keys: {
          useHeaders: [],
          useQueryParams: true,
        },
        contentTypes: [
          'api::action.action',
          'api::broadcast.broadcast',
          'api::case-study.case-study',
          'api::equipment.equipment',
          'api::equipment-category.equipment-category',
          'api::faq.faq',
          'api::industry.industry',
          'api::inquiry.inquiry',
          'api::material.material',
          'api::material-category.material-category',
          'api::navigation.navigation',
          'api::news.news',
          'api::news-category.news-category',
          'api::page.page',
          'api::quality-level.quality-level',
          'api::renderer.renderer',
          'api::site.site',
          'api::subscriber.subscriber',
          'api::surface-treatment.surface-treatment',
          'api::ui-section.ui-section',
          'api::video.video',
        ],
      },
    },
  },
});

export default config;
