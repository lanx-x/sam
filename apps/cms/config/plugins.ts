import type { Core } from '@strapi/strapi';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'better-blocks': {
    enabled: true,
  },
  'strapi-v5-plugin-populate-deep': {
    config: {
      // defaultDepth: 10, // Default is 5
    }
  },
  oembed: {
    enabled: true,
  },
  email: {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT'),
        secure: env.bool('SMTP_SECURE', true),
        requireTLS: env.bool('SMTP_REQUIRE_TLS', false),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        connectionTimeout: env.int('SMTP_CONNECTION_TIMEOUT', 10_000),
        greetingTimeout: env.int('SMTP_GREETING_TIMEOUT', 10_000),
        socketTimeout: env.int('SMTP_SOCKET_TIMEOUT', 20_000),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', env('EMAIL_DEFAULT_FROM')),
      },
    },
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
          'api::application.application',
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
