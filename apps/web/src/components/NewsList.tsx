import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import { NewsClientList } from "./NewsClientList";

const PAGE_SIZE = 12;

export async function NewsList({ section, searchParams, slug, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const page = Number(searchParams?.page) || 1
  const categoryId = searchParams?.category as string | undefined

  const [data, categories] = await Promise.all([
    api.getNews({
      'pagination[page]': page,
      'pagination[pageSize]': PAGE_SIZE,
      ...(categoryId && { 'filters[category][documentId][$eq]': categoryId }),
    }),
    api.getNewsCategory({}),
  ])

  const basePath = ['', locale, ...slug].join('/')

  return <NewsClientList data={data} pageSize={PAGE_SIZE} categories={categories.data} activeCategoryId={categoryId} basePath={basePath} />
}
