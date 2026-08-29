import type { Schema, Struct } from '@strapi/strapi';

export interface DisplayTextCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_display_text_case_studies';
  info: {
    displayName: 'CaseStudy';
  };
  attributes: {
    key_parameters: Schema.Attribute.String;
  };
}

export interface DisplayTextCommon extends Struct.ComponentSchema {
  collectionName: 'components_display_text_commons';
  info: {
    displayName: 'Common';
  };
  attributes: {
    address: Schema.Attribute.String;
    case_study: Schema.Attribute.Component<'display-text.case-study', false>;
    contact_us: Schema.Attribute.String;
    email: Schema.Attribute.String;
    fax: Schema.Attribute.String;
    form: Schema.Attribute.Component<'display-text.form', false>;
    industry: Schema.Attribute.String;
    material: Schema.Attribute.Component<'display-text.material', false>;
    mobile: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    subscribe: Schema.Attribute.Component<'display-text.subscribe', false>;
    surface_treatment: Schema.Attribute.Component<
      'display-text.surface-treatment',
      false
    >;
    tel: Schema.Attribute.String;
  };
}

export interface DisplayTextForm extends Struct.ComponentSchema {
  collectionName: 'components_display_text_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {
    browse_files: Schema.Attribute.String;
    change: Schema.Attribute.String;
    company: Schema.Attribute.String;
    drap_drop_tips: Schema.Attribute.String;
    email: Schema.Attribute.String;
    fail_tips: Schema.Attribute.String;
    files_format_tips: Schema.Attribute.String;
    invalid_tips: Schema.Attribute.String;
    message: Schema.Attribute.String;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    relevant_drawings: Schema.Attribute.String;
    remove: Schema.Attribute.String;
    required_tips: Schema.Attribute.String;
    submit: Schema.Attribute.String;
    success_page_tips: Schema.Attribute.String;
    success_page_title: Schema.Attribute.String;
    success_tips: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface DisplayTextMaterial extends Struct.ComponentSchema {
  collectionName: 'components_display_text_materials';
  info: {
    displayName: 'Material';
  };
  attributes: {
    corrosion_resistance: Schema.Attribute.String;
    density: Schema.Attribute.String;
    desc: Schema.Attribute.String;
    elongation_at_break: Schema.Attribute.String;
    fatigue_strength: Schema.Attribute.String;
    hardness: Schema.Attribute.String;
    materials: Schema.Attribute.String;
    processability: Schema.Attribute.String;
    strength: Schema.Attribute.String;
    tensile_strength: Schema.Attribute.String;
    typical_applications: Schema.Attribute.String;
  };
}

export interface DisplayTextSubscribe extends Struct.ComponentSchema {
  collectionName: 'components_display_text_subscribes';
  info: {
    displayName: 'Subscribe';
  };
  attributes: {
    fail_tips: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    subscribe: Schema.Attribute.String;
    success_tips: Schema.Attribute.String;
  };
}

export interface DisplayTextSurfaceTreatment extends Struct.ComponentSchema {
  collectionName: 'components_display_text_surface_treatments';
  info: {
    displayName: 'SurfaceTreatment';
  };
  attributes: {
    applicable_materials: Schema.Attribute.String;
    desc: Schema.Attribute.String;
    services: Schema.Attribute.String;
    specifications: Schema.Attribute.String;
    surface_treatment: Schema.Attribute.String;
  };
}

export interface GlobalSeo extends Struct.ComponentSchema {
  collectionName: 'components_global_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    desc: Schema.Attribute.String &
      Schema.Attribute.CustomField<'global::char-count'>;
    title: Schema.Attribute.String &
      Schema.Attribute.CustomField<'global::char-count'>;
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
    actions: Schema.Attribute.Relation<'oneToMany', 'api::action.action'>;
    desc: Schema.Attribute.Text;
    extension: Schema.Attribute.Component<'item.kv-item', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    target_url: Schema.Attribute.String;
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
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ItemMaterialSpecificationItem extends Struct.ComponentSchema {
  collectionName: 'components_item_material_specification_items';
  info: {
    displayName: 'MaterialSpecificationItem';
  };
  attributes: {
    density: Schema.Attribute.String;
    desc: Schema.Attribute.Text;
    elongation_at_break: Schema.Attribute.String;
    fatigue_strength: Schema.Attribute.String;
    hardness: Schema.Attribute.String;
    name: Schema.Attribute.String;
    tensile_strength: Schema.Attribute.String;
  };
}

export interface ItemNavBasicItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nav_basic_items';
  info: {
    displayName: 'NavBasicItem';
  };
  attributes: {
    alt_icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    desc: Schema.Attribute.Text;
    external_url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    industry: Schema.Attribute.Relation<'oneToOne', 'api::industry.industry'>;
    name: Schema.Attribute.String;
    target_anchor: Schema.Attribute.String;
    target_page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    target_type: Schema.Attribute.Enumeration<
      ['internal_page', 'external_url', 'industry', 'popup']
    >;
  };
}

export interface ItemNavGroupItem extends Struct.ComponentSchema {
  collectionName: 'components_item_nav_group_items';
  info: {
    displayName: 'NavNestItem';
  };
  attributes: {
    alt_icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    children: Schema.Attribute.Component<'item.nav-basic-item', true>;
    desc: Schema.Attribute.Text;
    external_url: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    target_anchor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    target_page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    target_type: Schema.Attribute.Enumeration<
      ['internal_page', 'external_url', 'popup']
    >;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['Application', 'Industries']>;
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
    external_url: Schema.Attribute.String;
    featured_news: Schema.Attribute.Relation<'oneToOne', 'api::news.news'>;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    target_anchor: Schema.Attribute.String;
    target_page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    target_type: Schema.Attribute.Enumeration<
      ['internal_page', 'external_url', 'popup']
    >;
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
    materials: Schema.Attribute.Relation<'oneToMany', 'api::material.material'>;
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
    overwrite_style: Schema.Attribute.Component<'item.kv-item', true>;
    payload: Schema.Attribute.Relation<
      'oneToOne',
      'api::ui-section.ui-section'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'display-text.case-study': DisplayTextCaseStudy;
      'display-text.common': DisplayTextCommon;
      'display-text.form': DisplayTextForm;
      'display-text.material': DisplayTextMaterial;
      'display-text.subscribe': DisplayTextSubscribe;
      'display-text.surface-treatment': DisplayTextSurfaceTreatment;
      'global.seo': GlobalSeo;
      'item.button-item': ItemButtonItem;
      'item.category-item': ItemCategoryItem;
      'item.common-item': ItemCommonItem;
      'item.kv-item': ItemKvItem;
      'item.material-specification-item': ItemMaterialSpecificationItem;
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
