import { Assets } from "@/assets";
import Image from "next/image";

export function Surface() {
  return (
    <div className="px-5 py-10 xl:px-0 xl:w-7xl xl:mx-auto">
      <h2 className="section-title">Dolor odit quisquam qui voluptas nisi. Excepturi laboriosam voluptatibus obcaecati!</h2>
      <p className="section-desc">Amet eaque debitis eum nemo consequuntur! Consequuntur iure aspernatur corrupti illo praesentium beatae Aperiam voluptate est veniam quisquam enim. Nesciunt!</p>

      <div className="grid grid-cols-2 gap-1.5 mt-10 xl:grid-cols-4 xl:gap-5">
        {
          [1, 2, 3, 4, 5, 6].map((xs, idx) => (
            <div className="rounded-lg overflow-hidden bg-[#fafafa]">
              <Image src={Assets.Cap} alt="" className="w-full aspect-172/90" />
              <div className="p-4">
                <p className="text-lg font-semibold leading-none mb-2">Ipsum corrupti?</p>
                <p className="leading-none">Elit accusantium alias totam quas nulla. Esse obcaecati similique adipisci nemo officia! Recusandae enim a sit quasi maiores. Impedit architecto.</p>
              </div>

            </div>
          ))
        }


      </div>

    </div>
  )
}
