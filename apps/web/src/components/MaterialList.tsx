import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import { mergeExtension } from "@/utils";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList(props: CmpProps) {
  const { section, slug, locale } = props
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)
  const categories = await api.getMaterialCategory({})
  const data = await api.getMaterial({})
  const basePath = ['', locale, ...slug].join('/')

  return <MaterialClientList {...props} categories={categories} materials={data} basePath={basePath} emptyText={extension?.empty_text?.value} />
}
