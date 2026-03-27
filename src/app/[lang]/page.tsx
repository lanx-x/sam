import Image from "next/image";
import { Assets } from "@/assets";
import { Banner } from "./_components/Banner";
import { OneStop } from "./_components/OneStop";
import { CustomerStory, Equipment, FAQ, SayAbout, Specification, WorkShop, WorkWith } from "./_components/Misc";

function Stats() {
  const data = [
    {
      value: "Ipsum quaerat dolorum perferendis",
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
    {
      value: "Ipsum alias quaerat dolorum perferendis",
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
    {
      value: "Ipsum alias quaerat dolorum perferendis",
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
    {
      value: "Ipsum alias quaerat dolorum perferendis",
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
    {
      icon: Assets.Iso,
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
  ]

  return (
    <div className="pt-10  border-b border-[#efefef] lg:py-9">
      <div className="flex flex-row flex-wrap lg:w-7xl lg:mx-auto">
        {
          data.map((xs, idx) => (
            <div key={idx} className="flex flex-col overflow-hidden px-5 text-left w-1/2 truncate mb-10 lg:mb-0 lg:w-60 lg:mx-2 lg:items-center">
              {xs.icon ? <Image className="w-12.75 h-10.5 lg:w-17 lg:h-14" src={xs.icon} alt="icon" /> : <p className="leading-none text-4xl font-semibold truncate shrink-0 lg:text-5xl lg:h-14">{xs.value}</p>}
              <p className="truncate font-medium mt-4 shrink-0 lg:text-base lg:mt-3">{xs.label}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

function Cap() {
  const data = [1, 2, 3, 4]
  return (
    <div className="text-center px-5 bt mt-15 mb-10 lg:mb-18.25">
      <h2 className="font-semibold text-[32px] mb-2 lg:text-5xl">Dolor amet repudiandae accusamus officia</h2>
      <p className="mb-10 lg:text-base">Dolor ipsam vero aliquam esse recusandae, quasi dignissimos Laboriosam ipsum.</p>

      <div className="flex flex-col lg:w-7xl lg:mx-auto lg:flex-row">
        {
          data.map((xs, idx) => (
            <div key={idx} className="group w-full aspect-35/16 relative lg:w-80 lg:h-120">
              <Image src={Assets.Cap} alt="cap" fill className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,35,70,0)_0%,#001123_100%)]" />
              <div className="px-5 relative w-full h-full flex flex-col group-hover:hidden">
                <h3 className="text-white text-2xl font-semibold mb-10 mt-auto truncate">Ipsum nostrum est perspiciatis provident?</h3>
              </div>
              <div className="absolute inset-0 bg-[rgba(0,118,238,0.90)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full w-full px-5 pt-30 pb-12 text-left flex flex-col">
                  <p className="font-semibold text-2xl/none text-white mb-8">Consectetur id ullam!</p>
                  <p className="text-white text-sm leading-4.5 flex-1">Consectetur ducimus suscipit quasi obcaecati ducimus? Fugit illum aspernatur fugit velit fuga! At vel autem fuga error perferendis consequatur? Doloremque iste repellendus est ex veniam beatae. Quidem commodi unde consequuntur!</p>
                  <div className="text-white font-medium text-base flex flex-row items-center">
                    <span>View more</span>
                    <Image src={Assets.Link} alt="link" className="ml-3" />

                  </div>
                </div>
              </div>

            </div>

          ))
        }
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Banner />
      <Stats />
      <Cap />
      <OneStop />
      <SayAbout />
      <CustomerStory />
      <Specification />
      <Equipment />
      <WorkWith />
      <WorkShop />
      <FAQ />
    </div>
  );
}
