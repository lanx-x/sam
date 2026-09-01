'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import { getStrapiMedia } from "@/utils/strapi";
import type { Application, Industry, Navigation, Site } from "cms-types";
import { getHref, withLocalePath } from "@/utils";
import { buildDynamicDetailPath, slugifyDynamicSegment } from "@/utils/dynamic-routes";
import { ActionButton } from "./ActionButton";

export type NavGrouptItem = NonNullable<Navigation["value"]>[number];
export type NavChildItem = NonNullable<NonNullable<NavGrouptItem["children"]>>[number];
export type NavBasicItem = NonNullable<NonNullable<NavChildItem['children']>>[number];

const getChild = (type: NavChildItem['type'], group: NavGrouptItem) => group.children?.find(xs => xs.type === type)

type NavProps = {
  data: Navigation,
  siteData: Site,
  locale: string
  showLogoOnly: boolean
  isHome: boolean
  applications: Application[]
  industries: Industry[]
  scrolled?: boolean
}

export function Nav(props: NavProps) {
  const { isHome } = props;
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) return;

    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);


  return (
    <>
      {isHome && <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px" />}
      {!isHome && <div aria-hidden="true" className="h-15" />}
      <header className={`fixed inset-x-0 top-0 z-40 transition-shadow duration-300 ${!isHome || stuck ? 'shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]' : ''}`}>
        <div className="block xl:hidden">
          <MobileNav {...props} scrolled={stuck} />
        </div>

        <div className="hidden xl:block">
          <DesktopNav {...props} />
        </div>
      </header>
    </>
  )
}


export function MobileNav(props: NavProps) {
  const { data, siteData, locale, isHome, applications, industries, scrolled = false } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const updateScrollState = (event?: Event) => {
      const target = event?.target;
      const targetScrollTop = target instanceof HTMLElement ? target.scrollTop : 0;
      const scrollTop = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        targetScrollTop,
      );

      setHasScrolled(scrollTop > 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    document.addEventListener("scroll", updateScrollState, { capture: true, passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      document.removeEventListener("scroll", updateScrollState, { capture: true });
    };
  }, [isHome]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      setVisible(false);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleGroup = (id: string) => {
    setOpenId((current) => current === id ? null : id);
  }

  const useScrolledStyles = !isHome || scrolled || hasScrolled;

  return (
    <div className="relative">
      <nav className={`flex h-15 flex-row items-center px-5 transition-colors duration-300 ${useScrolledStyles ? "bg-white" : "bg-transparent"}`}>
        <Link href={withLocalePath(locale, "/")} className="relative shrink-0 block h-8 w-23.5">
          <Image
            src={getStrapiMedia(siteData.logo) ?? ""}
            width={94}
            height={32}
            alt="logo"
            className={`absolute inset-0 h-8 w-23.5 transition-opacity duration-300 ${useScrolledStyles ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={getStrapiMedia(siteData.logo_secondary) ?? ""}
            width={94}
            height={32}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-8 w-23.5 transition-opacity duration-300 ${useScrolledStyles ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        <button
          ref={buttonRef}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={handleToggle}
          className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          {[0, 1, 2].map((line) => (
            <span
              key={line}
              className={`h-0.75 w-6 rounded-full transition-all duration-300 ${useScrolledStyles ? "bg-primary" : "bg-white"} ${isOpen && line === 0 ? "translate-y-2.25 rotate-45" : ""
                } ${isOpen && line === 1 ? "opacity-0" : ""} ${isOpen && line === 2 ? "-translate-y-2.25 -rotate-45" : ""}`}
            />
          ))}
        </button>
      </nav>

      {
        isOpen && (
          <div
            className="fixed inset-x-0 bottom-0 bg-[#efefef] z-50 transition-transform duration-300 ease-out"
            style={{ top: '3.75rem', transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
          >
            <div className="h-full overflow-y-auto overscroll-contain px-5 pb-8">
              {data?.value?.filter(xs => xs.type !== 'home')?.map((group, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}>
                  <button className="block font-medium w-full text-left h-16 text-base capitalize text-primay" onClick={() => toggleGroup(String(group.id))}>
                    {group.type === 'about' ? <Link href={withLocalePath(locale, getHref(group))} onClick={closeMenu}>{group.name}</Link> : group.name}
                  </button>

                  <div className={`grid transition-all duration-300 ease-out ${openId === String(group.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      {group.type === 'about' && null}

                      {group.type === 'solutions' && (
                        <div>
                          {
                            group.children?.map(nested => (
                              <div key={nested.id} className="">
                                <h4 className="text-base text-primary font-medium h-16 leading-16 px-5 border-b border-[#bfbfbf]">{nested.name}</h4>
                                <div>
                                  {nested.type === 'Application'
                                    ? applications.map((application) => (
                                      <Link
                                        className="block text-primary h-12 leading-12 px-5"
                                        key={application.documentId}
                                        href={withLocalePath(locale, `/solutions/application/${slugifyDynamicSegment(application.label ?? application.name ?? application.documentId)}`)}
                                        onClick={closeMenu}>
                                        {application.label ?? application.name}
                                      </Link>
                                    ))
                                    : nested.type === 'Industries'
                                      ? industries.map((industry) => (
                                        <Link
                                          className="block text-primary h-12 leading-12 px-5"
                                          key={industry.documentId}
                                          href={buildDynamicDetailPath(locale, "industry", industry)}
                                          onClick={closeMenu}>
                                          {industry.label ?? industry.name}
                                        </Link>
                                      ))
                                      : nested.children?.map((child) => (
                                      <Link
                                        className="block text-primary h-12 leading-12 px-5"
                                        target={nested.target_type === 'external_url' ? '_blank' : ''}
                                        key={child.id}
                                        href={(nested.type === 'Industries' && child.target_type === 'industry' && child.industry) ? buildDynamicDetailPath(locale, "industry", child.industry) : withLocalePath(locale, getHref(child))}
                                        onClick={closeMenu}>
                                        {child.name}
                                      </Link>
                                    ))}
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )}

                      {['capabilities', 'resources'].includes(group.type!) &&
                        group.children?.map((child) => (
                          <Link target={child.target_type === 'external_url' ? '_blank' : ''} key={child.id} className="h-12 flex items-center" href={withLocalePath(locale, getHref(child))} onClick={closeMenu}>
                            <p className="pl-5 font-sm text-primary">{child.name}</p>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );

}


export function DesktopNav(props: NavProps) {
  const { data, siteData, locale, isHome, applications, industries } = props;
  const groups = data.value ?? [];
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const update = () => setHasScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  const open = useCallback((key: string) => {
    clearTimeout(timer.current);
    setOpenKey(key);
    setActiveChild(-1);
  }, []);

  const scheduleClose = useCallback(() => {
    timer.current = setTimeout(() => setOpenKey(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  const close = useCallback(() => {
    setOpenKey(null);
  }, []);

  const useScrolledStyles = !isHome || hasScrolled;

  return (
    <div>
      <nav
        className={`h-15 z-999 transition-colors duration-300 ${useScrolledStyles ? "bg-white" : "bg-transparent"}`}
        onMouseLeave={scheduleClose}
      >
        <div className="flex items-center h-full xl:mx-30">
          <Link href={withLocalePath(locale, "/")} className="relative flex h-8 w-23.5 shrink-0 items-center">
            <Image
              src={getStrapiMedia(siteData.logo) ?? ""}
              width={94}
              height={32}
              alt="logo"
              className={`absolute inset-0 h-8 w-23.5 transition-opacity duration-300 ${useScrolledStyles ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src={getStrapiMedia(siteData.logo_secondary) ?? ""}
              width={94}
              height={32}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-8 w-23.5 transition-opacity duration-300 ${useScrolledStyles ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          {/* Desktop links */}
          <div className={`hidden xl:flex items-center h-full ml-auto ${props.showLogoOnly ? 'xl:hidden' : ''}`}>
            {groups.map((item, idx) => {
              const href = getHref(item);
              const hasChildren = item.children && item.children.length > 0;
              const isActive = openKey === item.name;

              const borderStyle = isActive ? "border-accent bg-[#efefef]" : "border-transparent"
              const fontStyle = isActive
                ? "text-accent font-medium"
                : `${useScrolledStyles ? "text-primary" : "text-white"} hover:text-accent hover:font-medium`

              return (
                <div
                  key={idx}
                  className={`h-full flex items-center justify-center transition-colors duration-300 min-w-33.5 hover:border-accent border-t-4 border-solid ${borderStyle} cursor-pointer`}
                  {...(hasChildren && item.name ? { onMouseEnter: () => open(item.name!) } : {})}
                >

                  <Link
                    href={href ? withLocalePath(locale, href) : "#"}
                    className={`text-sm leading-none transition-colors duration-300 ${fontStyle}`}>
                    {item.name}
                  </Link>
                </div>
              )
            })}

            {
              data.action && <ActionButton locale={locale} action={data.action} className="bg-accent text-white text-sm font-medium rounded-sm px-10 h-12 flex items-center justify-center transition-opacity hover:opacity-90 ml-10" />

            }
          </div>
        </div>
      </nav>

      <div className={`${props.showLogoOnly ? 'hidden' : ''}`}>
        {/* Group mega-menu dropdown */}
        {groups.map((group, idx) => {
          if (!group.children?.length || openKey !== group.name) return null;


          return (
            <div
              key={idx}
              className="absolute inset-x-0 top-full z-30 transition-opacity duration-300 ease-out"
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
              <div className="bg-[#efefef] min-h-120">
                <div className="xl:w-7xl xl:mx-auto">


                  {/* Capabilities. */}
                  {group.type === 'capabilities' && (
                    <div className="grid grid-cols-4 gap-5 pt-15 pb-28.5">

                      {group.children?.map((child, childIdx) => {
                        const href = withLocalePath(locale, getHref(child))

                        return (
                          <Link
                            key={childIdx}
                            href={href}
                            className={`group block`}
                            onMouseEnter={() => setActiveChild(childIdx)}
                            onClick={close}
                          >
                            <h4 className="text-2xl font-medium text-primary">{child.name}</h4>
                            <div className="w-76.25 h-45 relative mt-6 mb-5 overflow-hidden">
                              <Image alt="icon" src={getStrapiMedia(child.image) ?? ""} fill className="object-cover group-hover:scale-120 transition-transform duration-300" />
                            </div>
                            <p className="text-base leading-4.5 text-primary/66">{child.desc} </p>
                          </Link>
                        );
                      })}
                    </div>
                  )
                  }

                  {/* Solutions. */}
                  {group.type === 'solutions' && (
                    <div className="grid grid-cols-[1fr_400px] py-10">

                      <div className="">
                        <h3 className="text-lg leading-none mb-10 font-medium text-accent">{getChild('Application', group)?.name}</h3>
                        <div className="grid grid-cols-2 gap-y-8 gap-x-46">
                          {applications.map((application, childIdx) => {
                            return (
                              <Link
                                key={childIdx}
                                href={withLocalePath(locale, `/solutions/application/${slugifyDynamicSegment(application.label ?? application.name ?? application.documentId)}`)}
                                className={`group block transition-colors ${activeChild === childIdx ? "text-accent" : "hover:text-accent"} transition-colors duration-300 `}
                                onMouseEnter={() => setActiveChild(childIdx)}
                                onClick={close}
                              >
                                <h4 className="text-lg font-medium">{application.label ?? application.name}</h4>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-l border-[#dfdfdf] pl-10">
                        <h3 className="text-accent text-lg mb-10 font-medium leading-none">{getChild('Industries', group)?.name}</h3>
                        <div className="">
                          {
                            industries.map((industry) => (
                              <Link key={industry.documentId} href={buildDynamicDetailPath(locale, "industry", industry)} className="group block  hover:text-accent transition-colors duration-300" onClick={close}>
                                <h4 className="text-lg font-medium">{industry.label ?? industry.name}</h4>
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
                    <div className="grid grid-cols-3 gap-10 py-15">
                      {
                        group.children?.map((child) => (
                          <Link key={child.id} target={child.target_type === 'external_url' ? '_blank' : ""} href={withLocalePath(locale, getHref(child))} className="block w-100 group duration-300" onClick={close}>
                            <h3 className="text-2xl text-primary font-medium leading-none">{child.name}</h3>
                            <div className="relative mt-6 mb-5 w-100 h-60 overflow-hidden">
                              <Image alt="icon" src={getStrapiMedia(child.image) ?? ""} fill className="object-cover transition-transform group-hover:scale-120 duration-300" />
                            </div>
                            <p className="text-sm text-primary/66 leading-4.5">{child.desc}</p>

                          </Link>
                        ))
                      }
                    </div>
                  )
                  }


                  {/* About. */}
                  {group.type === 'about' && (
                    <div className="py-10 grid grid-cols-[1fr_560px] gap-25">
                      <div>
                        <div className="grid grid-cols-2 gap-5">
                          {
                            group.children?.map((child) => (
                              <Link key={child.id} href={withLocalePath(locale, getHref(child))} className="block p-5 hover:bg-primary transition-colors duration-300" onClick={close}>
                                <h3 className="mb-2 text-lg text-white font-medium leading-none">{child.name}</h3>
                                <p className="text-sm text-white/66 leading-4.5">{child.desc}</p>

                              </Link>
                            ))
                          }

                        </div>

                        <div className="mt-5 p-5">
                          <h3 className="text-lg text-white font-medium leading-none mb-2">{props.siteData?.display_text?.contact_us ?? 'Contact us'}</h3>
                          {
                            (['tel', 'mobile', 'email', 'fax', 'address'] as const).map((xs, idx) => (
                              <div className="flex flex-row text-sm mb-2 last:mb-0 leading-4.5 text-white/66" key={idx}>
                                <p className="capitalize mr-1">{xs}: </p>
                                <div>
                                  {
                                    siteData[xs]?.map(item => (
                                      <p key={item.id} className="">{xs === 'email' ? <a href={`mailto:${item.value}`} className="hover:text-white transition-colors duration-300">{item.value}</a> : item.value}</p>
                                    ))
                                  }
                                </div>
                              </div>
                            ))
                          }

                        </div>
                      </div>


                      <div className="relative w-full h-90">
                        <Image src={getStrapiMedia(group.image) ?? ""} fill alt="" className="object-cover" />
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
