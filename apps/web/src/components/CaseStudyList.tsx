import { CommonSection } from "cms-types";
import { getCaseStudy } from "@/api";
import { CaseStudyClientList } from "./CaseStudyClientList";

export async function CaseStudyList({ section, searchParams }: { section: CommonSection; searchParams: { [key: string]: string | string[] | undefined } }) {
  const pageSize = 12
  const page = Number(searchParams?.page) || 1
  const data = await getCaseStudy({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,

  })

  return <CaseStudyClientList data={data} pageSize={pageSize} />
}
