import Image from "next/image";
import { createLocalizedApi } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { ActionButton } from "./ActionButton";
import { CommonListWithIcon } from "./CommonListWithIcon";
import { FeaturedMoldCase } from "./FeaturedMoldCase";
import { MoldCapabilities } from "./MoldCapabilities";
import { ToolingCapabilities } from "./ToolingCapabilities";
import { CrossList } from "./CrossList";

export async function IndustryDetail({ documentId, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const [industry, actions] = await Promise.all([
    api.getIndustryDetail({ 'filters[documentId][$eq]': documentId }),
    api.getAction(),
  ]);
  const data = industry.data?.[0];
  const action = actions.data?.[0];

  const challenges = data?.challenges
    ? { title: data.challenges.title, data: data.challenges.data }
    : null;

  const parts = data?.parts
    ? { title: data.parts.title, data: data.parts.data }
    : null;

  const caseStudy = data?.case_study
    ? {
      title: data.case_study.title,
      desc: data.case_study.desc,
      data: data.case_study.data?.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.desc,
        image: item.image,
        extension: item.extension?.map((detail) => ({
          id: detail.id,
          key: detail.key,
        })),
      })),
    }
    : null;

  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Industry: {documentId} not found.</div>
  }

  return (
    <div>
      <div className="bg-[#fafafa] px-5">
        <div className="py-10 grid grid-cols-1 gap-10 xl:mx-auto xl:w-7xl xl:grid-cols-2 xl:gap-5 xl:py-15">
          <div className="xl:mt-10 xl:pr-20">
            <h1 className="text-4xl font-black mb-5">{data.detailPageTitle}</h1>
            <p className="text-base">{data.detailPageDesc}</p>

            <div className="mt-10 xl:w-50">
              {action && <ActionButton action={action} locale={locale} />}
            </div>
          </div>

          <Image alt="banner" src={getStrapiMedia(data.detailPageBanner) ?? ""} width={620} height={380} className="object-contain w-full aspect-auto rounded-lg" />
        </div>
      </div>


      <MoldCapabilities section={data.molding_capabilities} />

      <ToolingCapabilities section={data.tooling_capabilities} />
      <CommonListWithIcon payload={challenges} />

      <CrossList payload={caseStudy} styles="bg-[#fafafa]" />

      <FeaturedMoldCase payload={parts} />
    </div>
  )
}
