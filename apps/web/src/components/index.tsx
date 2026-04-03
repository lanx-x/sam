import type { ComponentType } from "react";
import { MainHero } from "./MainHero";
import { Stat } from "./Stat";
import { Cap } from "./Cap";
import { OneStop } from "./OneStop";
import { Comment } from "./Comment";
import { CustomerStory } from "./CustomerStory";
import { Spe } from "./Spe";
import { Equipment } from "./Equipment";
import { WorkWith } from "./WorkWith";
import { WorkShop } from "./WorkShop";
import { FAQ } from "./FAQ";
import { GetInTouch } from "./GetInTouch";
import { CommonHero } from "./CommonHero";
import { Partner } from "./Partner";
import { ProcessingTech } from "./ProcessingTech";
import dynamic from "next/dynamic";
import { ImageSection } from "./ImageSection";
import { Ship } from "./Ship";
import { SurfaceFinish } from "./SurfaceFinish";
import { Tolerance } from "./Tolerance";
import { Post } from "./Post";
import { Service } from "./Service";
import { IndustrySolution } from "./IndustrySolution";
import { Industry } from "./Industry";
import { WhyUs } from "./WhyUs";
import { WeOffer } from "./WeOffer";
import { GetExpertAdvice } from "./GetExpertAdvice";
import { WhySamples } from "./WhySamples";
import { WhyUsProduct } from "./WhyUsProduct";
import { EverythingForManufacturing } from "./EverythingForManufacturing";
import { ImageHero } from "./ImageHero";
import { SurfaceFinishList } from "./SurfaceFinishList";

export const CmpMap: Record<string, ComponentType<any>> = {
  MainHero,
  Stat,
  Cap,
  OneStop,
  Comment,
  CustomerStory,
  Spe,
  Equipment,
  WorkWith,
  WorkShop,
  FAQ,
  GetInTouch,

  CommonHero,
  Partner,
  ProcessingTech,
  ImageSection,
  Ship,
  SurfaceFinish,
  Tolerance,
  Post,
  Service,

  Industry,
  IndustrySolution,

  WhyUs,
  WeOffer,
  GetExpertAdvice,
  WhySamples,
  WhyUsProduct,
  EverythingForManufacturing,
  ImageHero,
  SurfaceFinishList,
}
