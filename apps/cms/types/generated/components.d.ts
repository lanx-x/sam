import type { Schema, Struct } from '@strapi/strapi';

export interface SectionCapSection extends Struct.ComponentSchema {
  collectionName: 'components_section_cap_sections';
  info: {
    displayName: 'CapSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.cap-item', true>;
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCommentSecion extends Struct.ComponentSchema {
  collectionName: 'components_section_comment_secions';
  info: {
    displayName: 'CommentSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.comment-item', true>;
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_section_faq_sections';
  info: {
    displayName: 'FaqSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.faq-item', true>;
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionGetInTouchSection extends Struct.ComponentSchema {
  collectionName: 'components_section_get_in_touch_sections';
  info: {
    displayName: 'GetInTouchSection';
  };
  attributes: {
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_section_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.slogon-item', true>;
    slogon: Schema.Attribute.String;
  };
}

export interface SectionServiceSecion extends Struct.ComponentSchema {
  collectionName: 'components_section_service_secions';
  info: {
    displayName: 'ServiceSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.service-item', true>;
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionWorkWithSection extends Struct.ComponentSchema {
  collectionName: 'components_section_work_with_sections';
  info: {
    displayName: 'WorkWithSection';
  };
  attributes: {
    data: Schema.Attribute.Component<'ui.work-with-item', true>;
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface UiCapItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_cap_items';
  info: {
    displayName: 'CapItem';
    icon: 'stack';
  };
  attributes: {
    desc: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiCommentItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_comment_items';
  info: {
    displayName: 'CommentItem';
    icon: 'stack';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    comment: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String;
  };
}

export interface UiFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_faq_items';
  info: {
    displayName: 'FaqItem';
  };
  attributes: {
    a: Schema.Attribute.Text;
    q: Schema.Attribute.Text;
  };
}

export interface UiServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_service_items';
  info: {
    displayName: 'ServiceItem';
    icon: 'stack';
  };
  attributes: {
    desc: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    list: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiSlogonItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_slogon_items';
  info: {
    displayName: 'HeroItem';
    icon: 'stack';
  };
  attributes: {
    desc: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiStatItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_stat_items';
  info: {
    displayName: 'StatItem';
    icon: 'stack';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiWorkWithItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_work_with_items';
  info: {
    displayName: 'WorkWithItem';
  };
  attributes: {
    desc: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'section.cap-section': SectionCapSection;
      'section.comment-secion': SectionCommentSecion;
      'section.faq-section': SectionFaqSection;
      'section.get-in-touch-section': SectionGetInTouchSection;
      'section.hero-section': SectionHeroSection;
      'section.service-secion': SectionServiceSecion;
      'section.work-with-section': SectionWorkWithSection;
      'ui.cap-item': UiCapItem;
      'ui.comment-item': UiCommentItem;
      'ui.faq-item': UiFaqItem;
      'ui.service-item': UiServiceItem;
      'ui.slogon-item': UiSlogonItem;
      'ui.stat-item': UiStatItem;
      'ui.work-with-item': UiWorkWithItem;
    }
  }
}
