import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { globalApi } from "@/api";
import { CaseStudyClientList } from "./CaseStudyClientList";

export async function CaseStudyList({ section, searchParams, slug, locale }: CmpProps) {
  const pageSize = 12
  const page = Number(searchParams?.page) || 1
  const data = await globalApi.getCaseStudy({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,

  })

  const basePath = ['', locale, ...slug].join('/')

  return <CaseStudyClientList data={data} pageSize={pageSize} basePath={basePath} />
}
