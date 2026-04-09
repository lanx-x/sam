import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getMaterial, getMaterialCategory } from "@/api";
import { mergeExtension } from "@/utils";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList({ section, slug, locale }: CmpProps) {
  const extension = mergeExtension(section)
  const categories = await getMaterialCategory({})
  const data = await getMaterial({})
  const basePath = ['', locale, ...slug].join('/')

  return <MaterialClientList categories={categories} materials={data} basePath={basePath} emptyText={extension?.empty_text?.value} />
}
