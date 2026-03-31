import { Assets } from "@/assets";
import Image from "next/image";

export function PTech() {
  return (
    <div className="px-5 xl:w-7xl xl:mx-auto">
      <h2 className="section-title">Sit repudiandae omnis nesciunt nihil a. Veniam voluptatem repellendus minus!</h2>
      <p className="section-desc">Adipisicing pariatur pariatur molestiae ea ut odit? Omnis quidem soluta optio rerum pariatur quae Vero deserunt corporis minus maiores libero ipsum Assumenda doloribus necessitatibus dolorem id assumenda Omnis reiciendis dolorum perspiciatis enim quibusdam Adipisci facilis sequi nihil fugiat numquam vitae. Inventore porro adipisci perferendis ad laborum autem tenetur Itaque odio</p>

      <style>{`img {
        shape-outside: url(${Assets.Ptech.src});
        shape-image-threshold: 0.08;
        shape-margin: 1rem;
      }
      `}</style>
      <div className="grid grid-cols-1 gap-3 mt-10 xl:grid-cols-2 xl:gap-5">
        {
          [1, 2, 3].map((xs, idx) => (
            <div key={idx} className="relative rounded-lg py-10 px-5 overflow-hidden  bg-[#f8f9fb] w-full xl:min-h-90">
              <Image src={Assets.Ptech} className=" object-cover float-right -mr-10  shape-outside-custom" alt="bg" />
              <p className="text-xl font-semibold leading-none mb-10">Sit voluptatem sunt perspiciatis tempora!</p>
              <div className="h-1 w-16 bg-accent mb-4"></div>
              <p className="leading-none">{idx === 1 ? 'lorem fdsfas ' : 'Consectetur eaque asperiores aspernatur et quis Accusantium sed incidunt deserunt impedit id qui consequuntur Ipsa tenetur perspiciatis excepturi ipsam voluptatem Assumenda voluptates eius aperiam culpa repellendus ipsum. Quisquam soluta quisquam iste hic nobis Impedit quidem suscipit fugit sint dolor? Culpa inventore obcaecati provident fugiat at Ut corporis aliquam eveniet eum voluptate. Eos veniam nobis eaque vel atque, illo. Voluptas assumenda iste temporibus hic sed Natus vero rem quo earum corporis labore Ad facilis nisi fuga ducimus nisi? Dolorum corrupti odit aperiam distinctio omnis unde Deserunt repellendus voluptate rerum quis modi. Perferendis laudantium aliquam commodi saepe impedit velit maxime Ex dicta illum tenetur quasi sed! Deserunt necessitatibus nesciunt reprehenderit exercitationem ea? Molestias labore quos illum repudiandae incidunt eos Aliquam quasi commodi perspiciatis cumque nam? Cum repellat eius commodi quod minus? Nemo quaerat asperiores numquam odit sunt. Expedita earum voluptatem earum rem inventore, cum Voluptate modi accusamus asperiores beatae quam Nesciunt dolor mollitia et ipsa a Quo pariatur itaque quidem dolore amet. Necessitatibus molestiae rem veniam exercitationem inventore Et ipsa pariatur animi enim nostrum? Quia nostrum animi soluta incidunt perspiciatis quasi corporis sapiente. Dolor dolor alias qui rem ab. Vel alias deleniti officiis veritatis sed laboriosam. Cumque soluta sit inventore iusto ullam?'}</p>
            </div>
          ))
        }

      </div>

    </div>
  )
}
