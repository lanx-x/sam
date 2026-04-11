import type { ComponentType } from "react";
import { MainHero } from "./MainHero";
import { Stat } from "./Stat";
import { Cap } from "./Cap";
import { OneStop } from "./OneStop";
import { FeaturedComment } from "./FeaturedComment";
import { FeaturedCaseStudy } from "./FeaturedCaseStudy";
import { FeaturedMaterial } from "./FeaturedMaterial";
import { FeaturedEquipment } from "./FeaturedEquipment";
import { WorkWith } from "./WorkWith";
import { WorkShop } from "./WorkShop";
import { FeaturedFAQ } from "./FeaturedFAQ";
import { GetInTouch } from "./GetInTouch";
import { CommonHero } from "./CommonHero";
import { ProcessingTech } from "./ProcessingTech";
import dynamic from "next/dynamic";
import { ImageSection } from "./ImageSection";
import { Ship } from "./Ship";
import { FeaturedSurfaceTreatment } from "./FeaturedSurfaceTreatment";
import { Tolerance } from "./Tolerance";
import { FeaturedNews } from "./FeaturedNews";
import { Service } from "./Service";
import { FeaturedIndustrySolution } from "./FeaturedIndustrySolution";
import { FeaturedIndustry } from "./FeaturedIndustry";
import { WhyUs } from "./WhyUs";
import { WhatWeOffer } from "./WhatWeOffer";
import { GetExpertAdvice } from "./GetExpertAdvice";
import { WhySamples } from "./WhySamples";
import { WhyUsProduct } from "./WhyUsProduct";
import { EverythingForManufacturing } from "./EverythingForManufacturing";
import { ImageHero } from "./ImageHero";
import { SurfaceTreatmentList } from "./SurfaceTreatmentList";
import { SurfaceTreatmentDetail } from "./SurfaceTreatmentDetail";
import { FullImageHero } from "./FullImageHero";
import { EquipmentList } from "./EquipmentList";
import { EquipmentDetail } from "./EquipmentDetail";
import { CaseStudyList } from "./CaseStudyList";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { NewsList } from "./NewsList";
import { NewsDetail } from "./NewsDetail";
import { VideoList } from "./VideoList";
import { MaterialList } from "./MaterialList";
import { MaterialDetail } from "./MaterialDetail";
import { IndustryDetail } from "./IndustryDetail";
import { HelpFrom } from "./HelpFrom";
import { Intro } from "./Intro";
import { MileStone } from "./MileStone";
import { WhatWeDo } from "./WhatWeDo";
import { ISOStandard } from "./ISOStandar";
import { Mission } from "./Mission";
import { Gallery } from "./Gallery";
import { PartnerStory } from "./PartnerStory";
import { Marquee } from "./Marquee";
import { FormGetQuote } from "./FormGetQuote";

export const CmpMap: Record<string, ComponentType<any>> = {
  MainHero,
  Stat,
  Cap,
  OneStop,
  FeaturedComment,
  FeaturedCaseStudy,
  FeaturedMaterial,
  FeaturedEquipment,
  WorkWith,
  WorkShop,
  FeaturedFAQ,
  GetInTouch,

  CommonHero,
  ProcessingTech,
  ImageSection,
  Ship,
  FeaturedSurfaceTreatment,
  Tolerance,
  FeaturedNews,
  Service,

  FeaturedIndustry,
  FeaturedIndustrySolution,

  WhyUs,
  WhatWeOffer,
  GetExpertAdvice,
  WhySamples,
  WhyUsProduct,
  EverythingForManufacturing,
  ImageHero,
  SurfaceTreatmentList,
  SurfaceTreatmentDetail,

  FullImageHero,
  EquipmentList,
  EquipmentDetail,
  CaseStudyList,
  CaseStudyDetail,
  NewsList,
  NewsDetail,
  VideoList,
  MaterialList,
  MaterialDetail,
  IndustryDetail,

  HelpFrom,

  Intro,
  MileStone,
  WhatWeDo,
  ISOStandard,
  Mission,
  PartnerStory,
  Gallery,
  Marquee,

  FormGetQuote,
}
