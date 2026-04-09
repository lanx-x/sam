import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.use(async (ctx, next) => {
      if (ctx.path.startsWith('/api/')) {
        const method = ctx.method;
        const path = ctx.path;
        const auth = ctx.request.header.authorization || 'NONE';
        const token = auth !== 'NONE' ? `${auth.slice(0, 15)}...` : 'NONE';

        strapi.log.info(`[debug-api] ${method} ${path} | auth: ${token}`);

        await next();

        strapi.log.info(`[debug-api] ${method} ${path} → ${ctx.status}`);
      } else {
        await next();
      }
    });
  },
};
