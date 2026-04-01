import { Assets } from "@/assets";
import Image from "next/image";

export function Ship() {
  return (
    <div className="px-5 py-10 flex flex-col xl:flex-row xl:w-7xl xl:mx-auto xl:py-20">
      <div className="">
        <h2 className="section-title xl:text-left">Sit id illum nihil natus dicta fugiat? Quas molestiae nulla!</h2>
        <p className="section-desc xl:text-left">Sit eum quod eius praesentium reiciendis inventore! Amet autem sequi eaque suscipit iusto cum? Amet illum fuga dolor elit illum?</p>

        <div className="mt-10 flex flex-col xl:flex-row">
          {
            [1, 2, 3].map((xs, idx) => (
              <div className="bg-[#fafafa] mb-2 py-8 px-5 xl:mr-5">
                <Image src={Assets.X} className="mb-8" alt="icon" />
                <p className="mb-3 text-lg font-semibold">Consectetur eos culpa perferendis ex nobis Placeat odio sequi possimus</p>
                <p>Adipisicing mollitia facere aliquid molestias ex Nobis ipsum totam qui eaque esse, dicta Quidem incidunt architecto autem sunt vero aperiam</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className="mt-5 xl:ml-25 shrink-0">
        <Image src={Assets.Cap} alt="workshop" className="rounded-lg object-cover xl:w-135 xl:h-120" />
      </div>

    </div>
  )
}
