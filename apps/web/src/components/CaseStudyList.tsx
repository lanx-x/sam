import { CommonSection } from "cms-types";
import { getCaseStudy } from "@/api";
import { CaseStudyClientList } from "./CaseStudyClientList";

export async function CaseStudyList({ section, searchParams, slug, lang }: { section: CommonSection; searchParams: { [key: string]: string | string[] | undefined }; slug: string[]; lang: string }) {
  const pageSize = 12
  const page = Number(searchParams?.page) || 1
  const data = await getCaseStudy({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,

  })

  const basePath = ['', lang, ...slug].join('/')

  return <CaseStudyClientList data={data} pageSize={pageSize} basePath={basePath} />
}
