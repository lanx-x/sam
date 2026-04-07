'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Assets } from "@/assets";
import { useLocale, useTranslations } from "@/i18n";
import { Menu } from "./Menu";
import { getStrapiMedia } from "@/utils/strapi";
import type { Navigation, Site } from "cms-types";
import type { StrapiComponent } from "cms-types";

type NavGrouptItem = NonNullable<Navigation["value"]>[number];
type NavChildItem = NonNullable<NonNullable<NavGrouptItem["children"]>>[number];

function getHref(item: NavGrouptItem | NavChildItem): string | undefined {
  if (item.external && item.external_url) return item.external_url;
  const slug = item.page?.slug;
  if (!slug) return '#';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function withLang(locale: string, path: string | undefined): string {
  if (!path) return "#";
  if (path.startsWith('http')) return path
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

const getChild = (type: NavChildItem['type'], group: NavGrouptItem) => group.children?.find(xs => xs.type === type)


export function Nav(props: { data: Navigation, site: Site }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="block xl:hidden">
        <MobileNav {...props} />
      </div>

      <div className="hidden xl:block">
        <DesktopNav {...props} />
      </div>
    </header>
  )
}


export function MobileNav(props: { data: Navigation, site: Site }) {
  const { data, site } = props;

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const toggleGroup = (id: string) => {
    setOpenId((current) => current === id ? null : id);
  }

  return (
    <div className="relative">
      <nav className="flex flex-row bg-white h-15 items-center px-5">
        <Link href={withLang(locale, "/")} className="flex items-center gap-2 shrink-0 flex-1">
          <Image src={Assets.Logo} width={40} height={40} alt="logo" className="w-10 h-10" />
          <Image src={Assets.LogoText} width={96} height={14} alt="" className="w-26.25 h-3.5 hidden sm:block" />
        </Link>

        <button ref={buttonRef} type="button" aria-label={isOpen ? "Close menu" : "Open menu"} onClick={handleToggle}>
          <Image src={isOpen ? Assets.Close : Assets.Menu} alt="" />
        </button>
      </nav>

      {
        isOpen && <div className="bg-[#111] vh-100">
          <div className="h-full overflow-y-auto px-5">
            <div className="">
              {data?.value?.filter(xs => xs.type !== 'home')?.map((group, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: isOpen ? `${index * 60}ms` : "0ms" }}>
                  <button className="block font-medium w-full text-left h-16 text-base capitalize text-white" onClick={() => toggleGroup(String(group.id))}>
                    {group.type === 'about' ? <Link href={withLang(locale, getHref(group))}>{group.name}</Link> : group.name}
                  </button>


                  <div className={`${openId === String(group.id) ? 'h-auto opacity-100' : 'h-0 opacity-0'} transition-all duration-300`}>
                    {group.type === 'about' && null}

                    {group.type === 'solutions' && (
                      <div>
                        {
                          group.children?.map(nested => (
                            <div key={nested.id} className="">
                              <h4 className="text-base text-white font-medium h-16 leading-16 px-5 border-b border-[#333]">{nested.name}</h4>
                              <div>
                                {
                                  nested.children?.map((child, childIdx) => (
                                    <Link className="block text-white h-12 leading-12 px-5" key={child.id} href={withLang(locale, getHref(child))} >{child.name}</Link>
                                  ))
                                }

                              </div>

                            </div>
                          ))
                        }
                      </div>
                    )}

                    {['capabilities', 'resources'].includes(group.type!) &&
                      group.children?.map((child, childIdx) => (
                        <div key={child.id} className="h-12 flex items-center">
                          <p className="pl-5 font-sm text-white">{child.name}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );

}


export function DesktopNav(props: { data: Navigation, site: Site }) {
  const { data, site } = props;
  const locale = useLocale();
  const groups = data.value ?? [];
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const open = useCallback((key: string) => {
    clearTimeout(timer.current);
    setOpenKey(key);
    setActiveChild(0);
  }, []);

  const scheduleClose = useCallback(() => {
    timer.current = setTimeout(() => setOpenKey(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return (
    <div>
      <nav className="bg-white h-15" onMouseLeave={scheduleClose}>
        <div className="flex items-center h-full xl:w-7xl xl:mx-auto">
          <Link href={withLang(locale, "/")} className="flex items-center gap-2 shrink-0">
            <Image src={Assets.Logo} width={40} height={40} alt="logo" className="w-10 h-10" />
            <Image src={Assets.LogoText} width={96} height={14} alt="" className="w-26.25 h-3.5 hidden sm:block" />
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-8 ml-auto">
            {groups.map((item, idx) => {
              const href = getHref(item);
              const hasChildren = item.children && item.children.length > 0;
              const isActive = openKey === item.name;

              return (
                <Link
                  key={idx}
                  href={href ? withLang(locale, href) : "#"}
                  className={`text-sm leading-none transition-colors duration-300 ${isActive ? "text-accent font-medium" : "text-primary hover:text-accent"}`}
                  {...(hasChildren && item.name ? { onMouseEnter: () => open(item.name!) } : {})}>
                  {item.name}
                </Link>
              )
            })}

            <Link href={withLang(locale, "/quote")} className="bg-accent text-white text-sm font-medium rounded-sm px-10 py-3 transition-opacity hover:opacity-90">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </nav>

      <div className="">
        {/* Group mega-menu dropdown */}
        {groups.map((group, idx) => {
          if (!group.children?.length || openKey !== group.name) return null;


          return (
            <div
              key={idx}
              className="absolute inset-x-0 top-full z-30 transition-opacity duration-200 ease-out"
              style={{
                // opacity: openKey === group.name ? 1 : 0,
                // pointerEvents: openKey === group.name ? "auto" : "none",
                opacity: 1,
                pointerEvents: 'auto',
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            // onMouseEnter={() => { cancelClose(); debugger }}
            // onMouseLeave={scheduleClose}
            >
              <div className="bg-[#111]">
                <div className="xl:w-7xl xl:mx-auto">


                  {/* Capabilities. */}
                  {group.type === 'capabilities' && (
                    <div className="grid grid-cols-[440px_1fr] gap-10">
                      <div className="flex flex-col border-r py-10 pr-10 border-[#333]">
                        <div className="flex-1">
                          {group.title && <h3 className="text-lg font-medium text-white mb-5">{group.title}</h3>}
                          {group.desc && <p className="text-[rgba(255,255,255,0.6)] text-sm">{group.desc}</p>}
                        </div>

                        {/* Featured image */}
                        {group.children?.[activeChild]?.image && (
                          <div className="relative h-40 w-100 rounded-lg overflow-hidden">
                            <Image src={getStrapiMedia(group.children[activeChild].image) || Assets.Banner} fill alt="" className="object-cover" />
                          </div>
                        )}
                      </div>

                      {/* Right - children items */}
                      <div className="py-10">
                        {group.children?.map((child, childIdx) => {
                          const href = withLang(locale, getHref(child))

                          return (
                            <Link
                              key={childIdx}
                              href={href}
                              className={`group block mb-1 last:mb-0 h-30 p-5 transition-colors ${activeChild === childIdx ? "bg-primary" : "hover:bg-primary"} `}
                              onMouseEnter={() => setActiveChild(childIdx)}
                            >
                              <div className="w-full flex flex-row gap-3 items-center">
                                {
                                  child.icon && <div className="relative w-8 h-8 aspect-square shrink-0">
                                    <Image src={getStrapiMedia(child.icon) ?? ""} alt="" className="object-cover" fill />
                                  </div>
                                }
                                <h4 className="text-lg font-medium text-white">{child.name}</h4>
                              </div>
                              {child.desc && <div className="pl-11 mt-2">
                                <p className="text-sm leading-4.5 text-white/66">{child.desc} </p>
                              </div>
                              }
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )
                  }

                  {/* Solutions. */}
                  {group.type === 'solutions' && (
                    <div className="grid grid-cols-[240px_1fr_400px]">
                      <div className="border-r border-r-[#333] py-10 pr-10">
                        <h3 className="text-lg leading-none mb-5 font-medium text-white">{getChild('LW Solutions', group)?.name}</h3>
                        <p className="text-white/66 leading-4.5">{getChild('LW Solutions', group)?.desc}</p>
                      </div>

                      <div className="p-10">
                        {getChild('LW Solutions', group)?.children?.map((child, childIdx) => {
                          return (
                            <Link
                              key={childIdx}
                              href={withLang(locale, getHref(child))}
                              className={`group block mb-1 last:mb-0 h-30 p-5 transition-colors ${activeChild === childIdx ? "bg-primary" : "hover:bg-primary"} `}
                              onMouseEnter={() => setActiveChild(childIdx)}
                            >
                              <div className="w-full flex flex-row gap-3 items-center">
                                {
                                  child.icon && <div className="relative w-8 h-8 aspect-square shrink-0">
                                    <Image src={getStrapiMedia(child.icon) ?? ""} alt="" className="object-cover" fill />
                                  </div>
                                }
                                <h4 className="text-lg font-medium text-white">{child.name}</h4>
                              </div>
                              {child.desc && <div className="pl-11 mt-2">
                                <p className="text-sm leading-4.5 text-white/66">{child.desc} </p>
                              </div>
                              }
                            </Link>
                          );
                        })}
                      </div>

                      <div className="border-l border-[#333] py-10 pl-6">
                        <h3 className="text-accent text-lg font-medium pl-4">{getChild('Industries', group)?.name}</h3>
                        <div className="mt-0.5">
                          {
                            getChild('Industries', group)?.children?.map((industry, idx) => (
                              <Link key={industry.id} href={withLang(locale, getHref(industry))} className="group block mb-1 last-mb-0 h-16 pl-4 hover:bg-primary">
                                <div className="flex flex-row items-center gap-2 h-full">
                                  <div className="relative w-8 h-8">
                                    <Image fill className="object-cover" alt="" src={getStrapiMedia(industry.icon) ?? ""} />
                                  </div>
                                  <p className="text-lg text-white font-medium">{industry.name}</p>
                                </div>
                              </Link>

                            ))
                          }
                        </div>

                      </div>
                    </div>
                  )
                  }


                  {/* Resources. */}
                  {group.type === 'resources' && (
                    <div className="flex flex-row items-start">
                      <div className="py-10 pr-10 flex-1 grid grid-cols-3 gap-5">
                        {
                          group.children?.map((child, childIdx) => (
                            <Link key={child.id} target={child.external ? '_blank' : ""} href={withLang(locale, getHref(child))} className="block min-h-40 w-75 py-4 px-5 hover:bg-primary">
                              <div className="relative w-8 h-8">
                                <Image src={getStrapiMedia(child.icon) ?? ""} alt="" fill className="object-cover" />
                              </div>

                              <h3 className="text-lg text-white font-medium leading-none mt-5 mb-2">{child.name}</h3>
                              <p className="text-sm text-white/66 leading-4.5">{child.desc}</p>

                            </Link>
                          ))
                        }

                      </div>

                      <div className="min-h-140 relative w-80">
                        <Image src={getStrapiMedia(group.children?.[activeChild]?.image) ?? ""} alt="" fill className="object-cover" />
                      </div>
                    </div>
                  )
                  }


                  {/* About. */}
                  {group.type === 'about' && (
                    <div className="py-10 grid grid-cols-[1fr_560px] gap-25">
                      <div>
                        <div className="grid grid-cols-2 gap-5">
                          {
                            group.children?.map((child, childIdx) => (
                              <Link key={child.id} href={withLang(locale, getHref(child))} className="block p-5 hover:bg-primary">
                                <h3 className="text-lg text-white font-medium leading-none">{child.name}</h3>
                                <p className="text-sm text-white/66 leading-4.5">{child.desc}</p>

                              </Link>
                            ))
                          }

                        </div>

                        <div className="mt-5 p-5">
                          <h3 className="text-lg text-white font-medium leading-none mb-2">Contact us</h3>
                          {
                            (['tel', 'mobile', 'email', 'fax', 'address'] as const).map((xs, idx) => (
                              <div className="flex flex-row text-sm mb-2 last:mb-0 leading-4.5 text-white/66" key={idx}>
                                <p className="capitalize mr-1">{xs}: </p>
                                <div>
                                  {
                                    site[xs]?.map(xs => (
                                      <p key={xs.id} className="">{xs.value}</p>
                                    ))
                                  }
                                </div>
                              </div>
                            ))
                          }

                        </div>
                      </div>


                      <div className="relative w-full h-90">
                        <Image src={Assets.Cap} fill alt="" className="object-cover" />
                      </div>

                    </div>
                  )
                  }
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
