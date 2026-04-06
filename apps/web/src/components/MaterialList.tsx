import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getMaterial, getMaterialCategory } from "@/api";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList({ section, slug, lang }: CmpProps) {
  const categories = await getMaterialCategory({})
  const data = await getMaterial({})
  const basePath = ['', lang, ...slug].join('/')

  return <MaterialClientList categories={categories} materials={data} basePath={basePath} />
}
