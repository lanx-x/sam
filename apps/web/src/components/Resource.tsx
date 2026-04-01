import { Assets } from "@/assets";
import Image from "next/image";

export function Resource() {
  return (
    <div className="px-5 py-10 xl:w-7xl xl:mx-auto">
      <h2 className="section-title">Elit beatae eos atque natus.</h2>
      <p className="section-desc">Adipisicing dolorum molestias dolorum quam ea obcaecati Saepe quia a quos quos consequatur? Animi et recusandae laborum dolorum autem Libero.</p>

      <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {
          [1, 2, 3, 4, 5].map((xs, idx) => (
            <div key={idx} className="group border-b border-[#efefef] hover:border-accent">
              <div className="pb-5 border-b border-transparent group-hover:border-accent">
                <Image src={Assets.Cap} alt="" className="object-cover rounded-xl" />
                <p className="text-lg font-semibold mt-4 mb-2 leading-none group-hover:text-accent">Elit culpa inventore sed pariatur eum alias. Corrupti officiis accusamus voluptatum vel temporibus Fugit delectus eos qui odio harum explicabo</p>
                <span className="text-secondary leading-none">2026-02-02</span>
                <p className="leading-none line-clamp-2">Ipsum tempore inventore voluptatibus enim iure qui nostrum Facere velit porro nihil quis quia at sit Tempore dolorum dignissimos ipsa ea voluptatibus Sequi assumenda labore officia alias dolor adipisci, ratione? Minus voluptas porro odit eligendi quos! Perspiciatis blanditiis animi inventore necessitatibus earum Earum ratione odio recusandae at adipisci! Nostrum officia voluptates aut modi repudiandae! Deleniti nostrum illo repudiandae corrupti corporis Quod nisi non repudiandae vel sed corporis, autem, neque? Odio id nesciunt laboriosam id itaque? Ex unde saepe inventore laudantium?</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
