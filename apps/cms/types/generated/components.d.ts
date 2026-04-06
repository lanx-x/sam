import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalDisplayText extends Struct.ComponentSchema {
  collectionName: 'components_global_display_texts';
  info: {
    displayName: 'DisplayText';
  };
  attributes: {
    Subscribe: Schema.Attribute.Text;
  };
}

export interface GlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_global_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    desc: Schema.Attribute.String;
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

export interface ItemCategoryItem extends Struct.ComponentSchema {
  collectionName: 'components_item_category_items';
  info: {
    displayName: 'CategoryItem';
  };
  attributes: {
    desc: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isAll: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
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
    extend: Schema.Attribute.Component<'item.kv-item', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    target: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ItemKvItem extends Struct.ComponentSchema {
  collectionName: 'components_item_kv_items';
  info: {
    displayName: 'BasicItem';
  };
  attributes: {
    admin_note: Schema.Attribute.String & Schema.Attribute.Private;
    desc: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    key: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface ItemNavBasicItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nav_basic_items';
  info: {
    displayName: 'NavBasicItem';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    external_url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface ItemNavGroupItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nav_group_items';
  info: {
    displayName: 'NavNestItem';
  };
  attributes: {
    children: Schema.Attribute.Component<'item.nav-basic-item', true>;
    desc: Schema.Attribute.Text;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    external_url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['LW Solutions', 'Industries']>;
  };
}

export interface ItemNavGrouptItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nav_groupt_items';
  info: {
    displayName: 'NavGrouptItem';
  };
  attributes: {
    children: Schema.Attribute.Component<'item.nav-group-item', true>;
    desc: Schema.Attribute.Text;
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    external_url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['home', 'capabilities', 'solutions', 'resources', 'about']
    > &
      Schema.Attribute.Required;
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

export interface ItemSpeItem extends Struct.ComponentSchema {
  collectionName: 'components_item_spe_items';
  info: {
    displayName: 'SpeItem';
  };
  attributes: {
    key: Schema.Attribute.Enumeration<
      [
        'Processability',
        'Strength',
        'Corrosion resistance',
        'Typical applications',
      ]
    >;
    value: Schema.Attribute.Enumeration<['Excellence', 'Good', 'Medium']>;
  };
}

export interface ItemSurfaceFinishExtendItem extends Struct.ComponentSchema {
  collectionName: 'components_item_surface_finish_extend_items';
  info: {
    displayName: 'SurfaceTreatmentExtendItem';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    desc: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ItemValueItem extends Struct.ComponentSchema {
  collectionName: 'components_item_value_items';
  info: {
    displayName: 'ValueItem';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItemVideoItem extends Struct.ComponentSchema {
  collectionName: 'components_item_video_items';
  info: {
    displayName: 'VideoItem';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'files' | 'images'>;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'files' | 'videos'>;
  };
}

export interface ListFeaturedEquipmentList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_equipment_lists';
  info: {
    displayName: 'FeaturedEquipment';
  };
  attributes: {
    equipment: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    >;
  };
}

export interface ListFeaturedFaqList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_faq_lists';
  info: {
    displayName: 'FeaturedFAQ';
  };
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
  };
}

export interface ListFeaturedIndustryList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_industry_lists';
  info: {
    displayName: 'FeaturedIndustry';
  };
  attributes: {
    industries: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry.industry'
    >;
  };
}

export interface ListFeaturedPostList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_post_lists';
  info: {
    displayName: 'FeaturedNews';
  };
  attributes: {
    news: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
  };
}

export interface ListFeaturedSpeList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_spe_lists';
  info: {
    displayName: 'FeaturedMaterial';
  };
  attributes: {
    specifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::specification.specification'
    >;
  };
}

export interface ListFeaturedStoryList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_story_lists';
  info: {
    displayName: 'FeaturedCaseStudy';
  };
  attributes: {
    case_studies: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    >;
  };
}

export interface ListFeaturedSurfaceFinishList extends Struct.ComponentSchema {
  collectionName: 'components_list_featured_surface_finish_lists';
  info: {
    displayName: 'FeaturedSurfaceTreament';
  };
  attributes: {
    surface_treatments: Schema.Attribute.Relation<
      'oneToMany',
      'api::surface-treatment.surface-treatment'
    >;
  };
}

export interface SectionCommonSection extends Struct.ComponentSchema {
  collectionName: 'components_section_common_sections';
  info: {
    displayName: 'CommonSection';
  };
  attributes: {
    admin_note: Schema.Attribute.String & Schema.Attribute.Private;
    extension: Schema.Attribute.Component<'item.kv-item', true>;
    payload: Schema.Attribute.Relation<
      'oneToOne',
      'api::ui-section.ui-section'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.display-text': GlobalDisplayText;
      'global.seo': GlobalSeo;
      'item.button-item': ItemButtonItem;
      'item.category-item': ItemCategoryItem;
      'item.common-item': ItemCommonItem;
      'item.kv-item': ItemKvItem;
      'item.nav-basic-item': ItemNavBasicItem;
      'item.nav-group-item': ItemNavGroupItem;
      'item.nav-groupt-item': ItemNavGrouptItem;
      'item.nest-item': ItemNestItem;
      'item.spe-item': ItemSpeItem;
      'item.surface-finish-extend-item': ItemSurfaceFinishExtendItem;
      'item.value-item': ItemValueItem;
      'item.video-item': ItemVideoItem;
      'list.featured-equipment-list': ListFeaturedEquipmentList;
      'list.featured-faq-list': ListFeaturedFaqList;
      'list.featured-industry-list': ListFeaturedIndustryList;
      'list.featured-post-list': ListFeaturedPostList;
      'list.featured-spe-list': ListFeaturedSpeList;
      'list.featured-story-list': ListFeaturedStoryList;
      'list.featured-surface-finish-list': ListFeaturedSurfaceFinishList;
      'section.common-section': SectionCommonSection;
    }
  }
}
