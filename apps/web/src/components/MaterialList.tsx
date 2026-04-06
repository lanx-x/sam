import { CommonSection } from "cms-types";
import { getMaterial, getMaterialCategory } from "@/api";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList({ section, slug, lang }: { section: CommonSection; slug: string[]; lang: string }) {
  const categories = await getMaterialCategory({})
  const data = await getMaterial({})
  const basePath = ['', lang, ...slug].join('/')

  return <MaterialClientList categories={categories} materials={data} basePath={basePath} />
}
