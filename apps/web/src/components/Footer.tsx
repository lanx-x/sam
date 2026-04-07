
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Assets } from "@/assets";
import { defaultLocale, getDictionary, isLocale, type Locale, I18nProvider } from "@/i18n";
import { Broadcast } from "@/components/Broadcast";
import { Nav } from "@/components/Nav";
import { Subscribe } from "@/components/Subscribe";
import { GetInTouch } from "@/components/GetInTouch";
import { getNavigation, getSite, getBroadcast } from "@/api";
import { Navigation, Site } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";
import Link from "next/link";
export function Footer({ site, navigation }: { site: Site, lang: string, navigation: Navigation }) {
  return (
    <div className="px-5 mt-15 xl:px-0 xl:w-7xl xl:mx-auto">
      <div className="flex flex-col xl:flex-row">
        <div className="mb-15 xl:mr-39.5 xl:mb-23">
          <div className="flex flex-row items-center mb-4">
            <Image width={172} height={40} className="object-cover" src={getStrapiMedia(site.logo_with_text) ?? ""} alt="" />
          </div>

          <p className="mb-5 text-base">{site.desc}</p>

          <div className="text-sm text-secondary" >
            {
              (['tel', 'mobile', 'email', 'fax', 'address'] as const).map(xs => (
                <div className={`flex items-start last:mt-5 mb-0.5`} key={xs}>
                  <p className="capitalize mr-2">{site[xs]?.[0]?.key ?? xs}:</p>
                  <div>
                    {site[xs]?.map(item => (
                      <p key={item.id}>{item.value}</p>
                    ))}

                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10 xl:grid-cols-4">
          {
            navigation.value?.filter(xs => xs.type !== 'home')?.map((group, idx) => {
              const children = group.type === 'solutions'
                ? group.children?.find(xs => xs.type === 'LW Solutions')?.children ?? []
                : group.children ?? []

              return <div key={idx}>
                <p className="font-medium text-base mb-6">{group.name}</p>
                <ul className="text-sm">
                  {children?.map(item => (
                    <li className="mb-3" key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            })
          }
        </div>
      </div>

      <div className="flex flex-col xl:flex-row-reverse xl:items-center mb-5">
        <Subscribe
          label={site.display_text?.Subscribe!}
          placeholder={site.display_text?.EmailPH!}
          className="border border-[#efefef] mb-10 xl:w-143 xl:mb-0" />

        <div className="flex flex-row items-center xl:flex-1">
          {
            site.social?.map(xs => (
              <Link target="_blank" href={xs.value ?? ""} className="" key={xs.id}>
                <Image width={24} height={24} className="w-6 h-6 mr-6 object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="x" />
              </Link>
            ))
          }
        </div>
      </div>


      <div className="w-full h-px bg-[#efefef]"></div>
      <p className="text-sm text-secondary my-7.5">{site.footer}</p>

    </div>
  )
}


