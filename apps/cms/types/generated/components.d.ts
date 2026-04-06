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
    items: Schema.Attribute.Component<'item.nest-item', true>;
    label: Schema.Attribute.String;
    target: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ItemKvItem extends Struct.ComponentSchema {
  collectionName: 'components_item_kv_items';
  info: {
    displayName: 'KVItem';
  };
  attributes: {
    desc: Schema.Attribute.String;
    key: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
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
    displayName: 'SurfaceFinishExtendItem';
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
    displayName: 'FeaturedIndustryList';
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
    displayName: 'FeaturedPostList';
  };
  attributes: {
    posts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
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
    displayName: 'FeaturedSurfaceFinishList';
  };
  attributes: {
    surface_finishes: Schema.Attribute.Relation<
      'oneToMany',
      'api::surface-finish.surface-finish'
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

export interface SectionEquipmentSection extends Struct.ComponentSchema {
  collectionName: 'components_section_equipment_sections';
  info: {
    displayName: 'EquipmentSection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    equipments: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    >;
    label: Schema.Attribute.String;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    style: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_section_faq_sections';
  info: {
    displayName: 'FAQSection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    style: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndustrySection extends Struct.ComponentSchema {
  collectionName: 'components_section_industry_sections';
  info: {
    displayName: 'IndustrySection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    industries: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry.industry'
    >;
    label: Schema.Attribute.String;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionPostSection extends Struct.ComponentSchema {
  collectionName: 'components_section_post_sections';
  info: {
    displayName: 'PostSection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    posts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    style: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionSpeSection extends Struct.ComponentSchema {
  collectionName: 'components_section_spe_sections';
  info: {
    displayName: 'SpeSection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    specifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::specification.specification'
    >;
    style: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionStorySection extends Struct.ComponentSchema {
  collectionName: 'components_section_story_sections';
  info: {
    displayName: 'StorySection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    style: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionSurfaceFinishSection extends Struct.ComponentSchema {
  collectionName: 'components_section_surface_finish_sections';
  info: {
    displayName: 'SurfaceFinishSection';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    renderer: Schema.Attribute.Relation<'oneToOne', 'api::renderer.renderer'>;
    style: Schema.Attribute.String;
    surface_finishes: Schema.Attribute.Relation<
      'oneToMany',
      'api::surface-finish.surface-finish'
    >;
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
      'item.kv-item': ItemKvItem;
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
      'section.equipment-section': SectionEquipmentSection;
      'section.faq-section': SectionFaqSection;
      'section.industry-section': SectionIndustrySection;
      'section.post-section': SectionPostSection;
      'section.spe-section': SectionSpeSection;
      'section.story-section': SectionStorySection;
      'section.surface-finish-section': SectionSurfaceFinishSection;
    }
  }
}
