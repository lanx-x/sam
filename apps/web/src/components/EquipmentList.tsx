import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { EquipmentClientList } from "./EquipmentClientList";

export async function EquipmentList(props: CmpProps) {
  const { section, slug, locale } = props
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)

  const categories = await api.getEquipmentCategory({})
  const data = await api.getEquipment({})
  const basePath = ['', locale, ...slug].join('/')

  return <EquipmentClientList {...props} categories={categories} equipments={data} basePath={basePath} />
}
