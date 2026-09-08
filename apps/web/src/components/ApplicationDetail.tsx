import { createLocalizedApi } from "@/api";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { ActionButton } from "./ActionButton";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { CommonListWithIcon } from "./CommonListWithIcon";
import { FeaturedMoldCase } from "./FeaturedMoldCase";

const normalizeNewlines = (value?: string | null) => value?.replace(/\\n/g, '\n');

export async function ApplicationDetail({ documentId, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const [application, actions] = await Promise.all([
    api.getApplicationDetail({ 'filters[documentId][$eq]': documentId }),
    api.getAction(),
  ]);
  const data = application.data?.[0];
  const action = actions.data?.[0];
  const capabilities = data?.capabilities
    ? { title: data.capabilities.title, data: data.capabilities.data }
    : null;
  const parts = data?.parts
    ? { title: data.parts.title, data: data.parts.data }
    : null;


  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Application: {documentId} not found.</div>
  }

  return (
    <div>
      <div className="px-5 xl:px-0">
        <div className="bg-[#fafafa]">
          <div className="py-10 grid grid-cols-1 gap-10 xl:mx-auto xl:w-7xl xl:grid-cols-2 xl:gap-auto xl:py-15">
            <div className="xl:mt-10 xl:pr-20 xl:w-170">
              <h1 className="text-4xl font-black mb-5 xl:text-[64px]">{data.detailPageTitle}</h1>
              <p className="text-base whitespace-pre-line">{normalizeNewlines(data.detailPageDesc)}</p>

              <div className="mt-10 xl:w-50">
                {action && <ActionButton action={action} locale={locale} />}
              </div>
            </div>

            <div className="relative w-full aspect-350/314 xl:aspect-58/52 rounded-lg overflow-hidden xl:w-145 xl:ml-auto">
              <Image alt="banner" src={getStrapiMedia(data.detailPageBanner) ?? ""} fill className="object-cover" />
            </div>
          </div>
        </div>



        <div className="py-15 flex flex-col-reverse gap-5 xl:w-7xl xl:mx-auto xl:flex-row xl:py-30 xl:pb-20 xl:gap-15">
          <div className="relative w-full aspect-350/245 rounded-lg overflow-hidden xl:w-150 xl:shrink-0">
            <Image alt="app" src={getStrapiMedia(data.image) ?? ""} fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-5 xl:text-4xl xl:mb-10">{data.name}</h2>
            <p className="text-sm whitespace-pre-line xl:text-base">{normalizeNewlines(data.desc)}</p>
          </div>
        </div>



        <div className="py-15 xl:py-25 xl:mx-auto xl:w-7xl">
          <h2 className="text-center text-2xl font-semibold mb-10 xl:text-5xl xl:mb-15">{data.advantages?.title}</h2>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-5">
            {data.advantages?.data?.map(xs => (
              <div key={xs.id} className="relative w-full aspect-350/267 rounded-lg overflow-hidden">
                <Image alt="pros" src={getStrapiMedia(xs.image) ?? ""} fill className="object-cover -z-1" />
                <p className="z-2 w-full h-12 bg-[rgba(0,0,0,0.25)] text-white absolute left-0 bottom-0 px-5 text-sm flex items-center font-bold">{xs.title}</p>
              </div>
            ))}
          </div>
        </div>


        <CommonListWithIcon payload={capabilities} />
        <FeaturedMoldCase payload={parts} />

      </div>
    </div>
  )
}
