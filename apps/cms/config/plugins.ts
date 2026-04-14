import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'strapi-v5-plugin-populate-deep': {
    config: {
      // defaultDepth: 10, // Default is 5
    }
  },
  oembed: {
    enabled: true,
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
});

export default config;
