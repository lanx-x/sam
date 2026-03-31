import { Assets } from "@/assets";
import Image from "next/image";

export function Tolerance() {
  const data = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="bg-[#fafafa] px-5 py-10">
      <div className="xl:w-7xl xl:mx-auto">
        <h2 className="section-title">Adipisicing nemo id distinctio ab obcaecati Accusamus sit facilis aut?</h2>
        <p className="section-desc">Elit nostrum ullam laborum distinctio assumenda Magnam nisi sunt consectetur tempora sapiente Illo blanditiis eveniet sunt sit dolores Soluta facere</p>

        <div className="grid grid-cols-1 mt-10 xl:grid-cols-2">
          {
            data.map((xs, idx) => (
              <div key={idx} className={`border-b border-secondary flex flex-row items-start py-5 min-h-21 first:border-t xl:odd:border-r xl:odd:last:border-r-0 xl:nth-[2]:border-t ${data.length % 2 ? 'xl:last:col-span-2' : ''} `}>
                <span className="text-base font-bold px-5 w-30 leading-none xl:w-42.5">Sit perferendis at</span>
                <p className="flex-1 leading-none">Elit provident itaque assumenda possimus?
                  Lorem repellendus odio quis praesentium consectetur dolorum velit Blanditiis eveniet quis ipsa maiores repellat fuga, velit minima. Dolore tempora inventore numquam obcaecati similique Modi fugit eius dignissimos a unde! Iusto
                </p>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}
