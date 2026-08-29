import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { mergeExtension } from "@/utils";
import { FAQ } from "cms-types";
import { createLocalizedApi } from "@/api";
import { FeaturedFAQClient } from "./FeaturedFAQClient";

export async function FeaturedFAQ({ section, documentId, slug, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  let faqs = (section.payload?.dynamic?.[0] as any)?.faqs as FAQ[] ?? []

  console.log("DESC", section?.payload?.desc)


  if (extension.basedOnId?.value === 'true') {
    if (slug.join('/').includes('resources/material')) {
      const featured = (await api.getMaterial({ 'filters[documentId][$eq]': documentId })).data?.[0]?.featured_faqs
      faqs = featured?.length ? featured : faqs
    }
    if (slug.join('/').includes('solutions/surface-treatment')) {
      const featured = (await api.getSurfaceTreatment({ 'filters[documentId][$eq]': documentId })).data?.[0]?.featured_faqs
      faqs = featured?.length ? featured : faqs
    }
  }

  return <FeaturedFAQClient
    title={section?.payload?.title ?? ''}
    desc={section?.payload?.desc ?? ''}
    faqs={faqs}
    bg_variant={bg_variant} />
}
