import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getMaterial, getMaterialCategory } from "@/api";
import { mergeExtension } from "@/utils";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList({ section, slug, lang }: CmpProps) {
  const extension = mergeExtension(section)
  const categories = await getMaterialCategory({})
  const data = await getMaterial({})
  const basePath = ['', lang, ...slug].join('/')

  return <MaterialClientList categories={categories} materials={data} basePath={basePath} emptyText={extension?.empty_text?.value} />
}
