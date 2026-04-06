import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getCaseStudy } from "@/api";
import { CaseStudyClientList } from "./CaseStudyClientList";

export async function CaseStudyList({ section, searchParams, slug, lang }: CmpProps) {
  const pageSize = 12
  const page = Number(searchParams?.page) || 1
  const data = await getCaseStudy({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,

  })

  const basePath = ['', lang, ...slug].join('/')

  return <CaseStudyClientList data={data} pageSize={pageSize} basePath={basePath} />
}
