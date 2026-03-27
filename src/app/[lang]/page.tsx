import Image from "next/image";
import { Assets } from "@/assets";
import { OneStop } from "@/app/_components/OneStop";
import { CustomerStory, Equipment, FAQ, SayAbout, Specification, WorkShop, WorkWith } from "@/app/_components/Misc";

function Banner() {
  const data = [1, 2, 3, 4]

  return (
    <div className="relative">
      <Image src={Assets.Banner} alt="banner" fill className="object-cover object-[70%_20%]" />
      <div className="absolute inset-0 bg-[linear-gradient(278deg,rgba(0,35,70,0)_31.39%,#001123_100%)]" />
      <div className="relative pt-20 px-5">
        <h2 className="text-4xl font-black text-white mb-10">High-Precision CNC Machining for Complex Parts.</h2>
        <div>
          {
            data.map((xs, idx) =>
              <div key={idx}>
                <p className="text-secondary font-medium mb-6.5">CNC Machining</p>
                <p className="text-white mb-4">Amet hic eligendi amet atque nulla Minus dolorem labore atque veniam illum ullam hic Blanditiis voluptate dolorem esse eligendi ipsam nobis, recusandae. Id vel nam temporibus voluptatem minima ab Explicabo maxime vero alias iusto pariatur! Ipsam totam vero maiores quae porro Odio fugit porro tempora adipisci provident, ad. A dignissimos</p>
              </div>
            )

          }
        </div>


        <div className="flex px-4.5 mt-20 pb-29 flex-row justify-evenly">
          <button className="w-40 h-12 bg-accent rounded-sm text-white font-medium truncate px-4">Lorem repellendus natus obcaecati vitae?</button>
          <button className="w-40 h-12 bg-white rounded-sm text-fg font-medium truncate px-4">Adipisicing voluptatum sit maiores eaque?</button>
        </div>
      </div>
    </div>
  )
}

function Stats() {
  const data = [
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
      value: "Ipsum alias quaerat dolorum perferendis",
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
    {
      icon: Assets.Iso,
      label: "Lorem velit blanditiis cupiditate consequuntur?",
    },
  ]

  return (
    <div className="py-10 flex flex-row flex-wrap border-b border-[#efefef]">
      {
        data.map((xs, idx) => (
          <div key={idx} className="px-5 text-left w-1/2 truncate mb-10">
            {xs.icon ? <Image className="w-12.75 h-10.5" src={xs.icon} alt="icon" /> : <span className="text-4xl font-semibold truncate">{xs.value}</span>}
            <p className="truncate font-medium mt-4">{xs.label}</p>
          </div>
        ))
      }

    </div>
  )
}

function Cap() {
  const data = [1, 2, 3, 4]
  return (
    <div className="text-center px-5 bt mt-15">
      <h2 className="font-semibold text-[32px] mb-2">Dolor amet repudiandae accusamus officia</h2>
      <p className="mb-10">Dolor ipsam vero aliquam esse recusandae, quasi dignissimos Laboriosam ipsum.</p>

      {
        data.map((xs, idx) => (
          <div key={idx} className="w-full aspect-35/16 relative">
            <Image src={Assets.Cap} alt="cap" fill className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,35,70,0)_0%,#001123_100%)]" />
            <div className="px-5 relative w-full h-full flex flex-col">
              <h3 className="text-white text-2xl font-semibold mb-10 mt-auto truncate">Ipsum nostrum est perspiciatis provident?</h3>
            </div>

          </div>

        ))
      }

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
