import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalNav extends Struct.ComponentSchema {
  collectionName: 'components_global_navs';
  info: {
    displayName: 'Nav';
  };
  attributes: {};
}

export interface GlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_global_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ItemButtonItem extends Struct.ComponentSchema {
  collectionName: 'components_item_button_items';
  info: {
    displayName: 'ButtonItem';
  };
  attributes: {
    action: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface ItemCommonItem extends Struct.ComponentSchema {
  collectionName: 'components_item_common_items';
  info: {
    displayName: 'CommonItem';
  };
  attributes: {
    actions: Schema.Attribute.Component<'item.button-item', true>;
    desc: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    items: Schema.Attribute.Component<'item.nest-item', true>;
    label: Schema.Attribute.String;
    target: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ItemFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_item_faq_items';
  info: {
    displayName: 'FaqItem';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ItemNestItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nest_items';
  info: {
    displayName: 'NestItem';
  };
  attributes: {
    desc: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionCommonSection extends Struct.ComponentSchema {
  collectionName: 'components_section_common_sections';
  info: {
    displayName: 'CommonSection';
  };
  attributes: {
    actions: Schema.Attribute.Component<'item.button-item', true>;
    data: Schema.Attribute.Component<'item.common-item', true>;
    desc: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.nav': GlobalNav;
      'global.seo': GlobalSeo;
      'item.button-item': ItemButtonItem;
      'item.common-item': ItemCommonItem;
      'item.faq-item': ItemFaqItem;
      'item.nest-item': ItemNestItem;
      'section.common-section': SectionCommonSection;
    }
  }
}
