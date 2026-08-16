import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { mergeDisplayText, mergeExtension } from "@/utils";
import { CaseStudy } from "cms-types";
import { createLocalizedApi } from "@/api";
import { FeaturedCaseStudyClient } from "./FeaturedCaseStudyClient";

export async function FeaturedCaseStudy({ section, documentId, slug, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  let caseStudies = ((section.payload?.dynamic?.[0] as any)?.case_studies as CaseStudy[]) ?? []

  if (extension.basedOnId?.value === 'true' && slug.join('/').includes('solutions/industry')) {
    const featured = (await api.getIndustry({ 'filters[documentId][$eq]': documentId })).data?.[0]?.case_studies
    if (featured?.length) caseStudies = featured
  }

  if (!caseStudies.length) return null

  return <FeaturedCaseStudyClient
    title={section.payload?.title}
    desc={section.payload?.desc}
    caseStudies={caseStudies}
    bg_variant={bg_variant}
    readFull={mergeDisplayText(section)?.read_full}
    locale={locale} />
}
