import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getNews, getNewsCategory } from "@/api";
import { NewsClientList } from "./NewsClientList";

const PAGE_SIZE = 12;

export async function NewsList({ section, searchParams, slug, lang }: CmpProps) {
  const page = Number(searchParams?.page) || 1
  const categoryId = searchParams?.category as string | undefined

  const [data, categories] = await Promise.all([
    getNews({
      'pagination[page]': page,
      'pagination[pageSize]': PAGE_SIZE,
      ...(categoryId && { 'filters[category][documentId][$eq]': categoryId }),
    }),
    getNewsCategory({}),
  ])

  const basePath = ['', lang, ...slug].join('/')

  return <NewsClientList data={data} pageSize={PAGE_SIZE} categories={categories.data} activeCategoryId={categoryId} basePath={basePath} />
}
