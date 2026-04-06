import { CommonSection } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getEquipment, getEquipmentCategory, getSurfaceFinish } from "@/api";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { EquipmentClientList } from "./EquipmentClientList";

export async function EquipmentList({ section, slug, lang }: { section: CommonSection; slug: string[]; lang: string }) {
  const extension = mergeExtension(section)

  const categories = await getEquipmentCategory({})
  const data = await getEquipment({})
  const basePath = ['', lang, ...slug].join('/')

  return <EquipmentClientList categories={categories} equipments={data} basePath={basePath} />
}
