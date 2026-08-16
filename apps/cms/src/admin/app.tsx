import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      'zh-Hans',
      // 'zh',
    ],
  },
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'char-count',
      type: 'string',
      intlLabel: {
        id: 'global.char-count.label',
        defaultMessage: 'Character count',
      },
      intlDescription: {
        id: 'global.char-count.description',
        defaultMessage: 'Text input with a live character count.',
      },
      components: {
        Input: async () => import('./components/CharCountInput'),
      },
    });
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
