import { CommonSection } from "cms-types";
import { getNews, getNewsCategory } from "@/api";
import { NewsClientList } from "./NewsClientList";

const PAGE_SIZE = 12;

export async function NewsList({ section, searchParams, slug, lang }: { section: CommonSection; searchParams: { [key: string]: string | string[] | undefined }; slug: string[]; lang: string }) {
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
