import { Assets } from "@/assets";
import { CommonSection } from "cms-types";
import Image from "next/image";

export function CommonHero({ section }: { section: CommonSection }) {
  return (
    <div className="px-5 mb-12.5 xl:w-7xl xl:mx-auto xl:mb-14.5">
      <div className="relative flex flex-col xl:flex-row">
        <div className="mb-10 xl:mr-50">
          <h2 className="section-title xl:text-left">Sit esse minima dignissimos sint veniam! Et sapiente eum necessitatibus.</h2>
          <p className="section-desc xl:text-left">Amet repellendus a ipsam magnam quasi dicta Culpa reiciendis sed incidunt provident saepe maxime Quo quas corporis dolorum magnam similique?</p>
        </div>

        <Image className="rounded-2xl xl:rounded-3xl xl:w-135 xl:h-80 object-cover" src={Assets.Cap} alt="" />


        <div className="flex flex-col mt-10 xl:flex-row xl:absolute xl:bottom-0">
          <button className="bg-accent rounded-sm text-white aspect-350/52 mb-4 xl:mb-0 xl:mr-5 xl:w-50 xl:aspect-200/52 truncate xl:px-4">Lorem nesciunt repellat consectetur ratione.</button>
          <button className="bg-primary rounded-sm text-white aspect-350/52 xl:w-50 xl:aspect-200/52 truncate xl:px-4">Lorem consectetur aspernatur lorem</button>
        </div>
      </div>


    </div>
  )
}
