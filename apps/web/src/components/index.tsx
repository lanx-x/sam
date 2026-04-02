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
}
