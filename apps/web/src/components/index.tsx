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

export const CmpMap: Record<string, ComponentType<{ section: unknown }>> = {
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
}
