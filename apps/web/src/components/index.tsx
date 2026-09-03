import type { ComponentType } from "react";
import { MainHero } from "./MainHero";
import { Stat } from "./Stat";
import { Cap } from "./Cap";
import { OneStop } from "./OneStop";
import { FeaturedComment } from "./FeaturedComment";
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
import { FeaturedIndustry } from "./FeaturedIndustry";
import { FeaturedApplication } from "./FeaturedApplication";
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
import { AboutSAM } from "./AboutSAM";
import { MoldMaking } from "./MoldMaking";
import { MoldProcessCarousel } from "./MoldProcessCarousel";
import { ProductionVideoCarousel } from "./ProductionVideoCarousel";
import { CommonList } from "./CommonList";
import { CheckList } from "./CheckList";
import { CrossList } from "./CrossList";
import { CommonListWithIcon } from "./CommonListWithIcon";
import { CaseCarousel } from "./CaseCarousel";
import { PlainSection } from "./PlainText";
import { FeaturedMoldCase } from "./FeaturedMoldCase";
import { AboutSAMWithStats } from "./AboutSAMWithStats";
import { GlobalCustomers } from "./GlobalCustomers";
import { ApplicationDetail } from "./ApplicationDetail";

export const CmpMap: Record<string, ComponentType<any>> = {
  MainHero,
  Stat,
  Cap,
  OneStop,
  FeaturedComment,
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
  FeaturedApplication,

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

  AboutSAM,
  MoldMaking,
  MoldProcessCarousel,
  ProductionVideoCarousel,


  CommonList,
  CommonListWithIcon,
  CheckList,
  CrossList,
  CaseCarousel,
  PlainSection,
  FeaturedMoldCase,
  AboutSAMWithStats,
  GlobalCustomers,
  ApplicationDetail,

}
