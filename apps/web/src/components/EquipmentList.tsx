import { CommonSection } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getEquipment, getEquipmentCategory, getSurfaceFinish } from "@/api";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { EquipmentClientList } from "./EquipmentClientList";

export async function EquipmentList({ section }: { section: CommonSection }) {
  const extension = mergeExtension(section)

  const categories = await getEquipmentCategory({})
  const data = await getEquipment({})

  return <EquipmentClientList categories={categories} equipments={data} />
}
