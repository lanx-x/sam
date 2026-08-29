import Image from "next/image";
import { Subscribe } from "@/components/Subscribe";
import { Navigation, Site } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";
import Link from "@/components/Link";
import { getHref, withLocalePath } from "@/utils";
export function Footer({ siteData, navigation, locale }: { siteData: Site, locale: string, navigation: Navigation }) {

  const data = navigation.value?.map(group => {
    if (group.type === 'home' || group.type === 'about') return []

    if (group.type === 'solutions') {
      return group.children?.map((child) => ({
        name: child.name,
        children: child.children,
      }))
    }

    return group
  }).flat().filter(Boolean) as Navigation['value'];

  return (
    <div className="px-5 pt-20 xl:px-30 xl:pt-17 bg-[#262626]">
      <Image width={94} height={32} className="w-23.5 h-8" src={getStrapiMedia(siteData.logo) ?? ""} alt="" />
      <div className="w-full h-px bg-[#333] mt-10 mb-15 xl:mt-13"></div>

      <div className="flex flex-col xl:flex-row">
        <div className="grid grid-cols-2 gap-10 mb-10 xl:grid-cols-4">
          {
            data?.map((group, idx) => {
              return <div key={idx}>
                <p className="font-medium text-base mb-6 text-white xl:text-xl">{group.name}</p>
                <ul className="text-sm xl:text-base">
                  {group.children?.map(item => (
                    <Link target={item.target_type === 'external_url' ? '_blank' : ''} href={withLocalePath(locale, getHref(item))} className="group block mb-3 text-secondary hover:text-accent" key={item.id}>
                      <span className="relative inline-block">
                        <span aria-hidden className="invisible font-medium">{item.name}</span>
                        <span className="absolute inset-0 group-hover:font-medium transition-all">{item.name}</span>
                      </span>
                    </Link>
                  ))}
                </ul>
              </div>
            })
          }
        </div>

        <div className="xl:ml-auto">
          <div className="text-sm text-secondary mb-15 xl:mb-10" >
            {
              (['tel', 'mobile', 'email', 'fax', 'address'] as const).map(xs => (
                <div className={`flex items-start last:mt-5 mb-0.5`} key={xs}>
                  <p className="capitalize mr-2">{siteData[xs]?.[0]?.key ?? xs}:</p>
                  <div>
                    {siteData[xs]?.map(item => (
                      <p key={item.id}>{xs === 'email' ? <a href={`mailto:${item.value}`} className="hover:text-accent transition-colors">{item.value}</a> : item.value}</p>
                    ))}

                  </div>
                </div>
              ))
            }
          </div>

          <Subscribe
            label={siteData.display_text?.subscribe?.subscribe ?? "Subscribe"}
            placeholder={siteData.display_text?.subscribe?.placeholder ?? "Enter your business email"}
            className="border border-[#efefef] mb-10 xl:w-143 xl:mb-0" />


          <div className="flex flex-row items-center xl:hidden">
            {
              siteData.social?.map(xs => (
                <Link target="_blank" href={xs.value ?? ""} className="" key={xs.id}>
                  <Image width={24} height={24} className="w-6 h-6 mr-6 object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="x" />
                </Link>
              ))
            }
          </div>
        </div>
      </div>





      <div className="w-full h-px bg-[#333] mt-5 xl:mt-25"></div>
      <div className="flex items-center xl:py-8.5 py-7.5">
        <p className="text-sm text-secondary">{siteData.footer}</p>


        <div className="xl:flex flex-row items-center hidden ml-auto gap-6">
          {
            siteData.social?.map(xs => (
              <Link target="_blank" href={xs.value ?? ""} className="" key={xs.id}>
                <Image width={24} height={24} className="w-6 h-6 object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="x" />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

