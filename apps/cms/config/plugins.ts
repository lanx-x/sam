import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'strapi-v5-plugin-populate-deep': {
    config: {
      defaultDepth: 3, // Default is 5
    }
  },
});

export default config;
