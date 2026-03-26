'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export function SayAbout() {
  const data = [1, 2, 3, 4]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <div className="relative text-center pt-10 pb-15">
      <Image src={Assets.Map} fill alt="map" className="object-cover" />
      <h2 className="text-[32px] font-semibold px-5 mb-2">Dolor facere nulla voluptatem eaque nulla nam aut. Ducimus mollitia!</h2>
      <p className="px-5 text-sm mb-28.5">Lorem architecto quod aperiam iste dignissimos Commodi repellat explicabo quisquam!</p>

      <div className="relative z-10" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div className="w-full shrink-0 flex justify-center items-center" key={idx}>
                <div className="bg-white w-87.5 h-90 rounded-lg flex flex-col shrink-0 px-5 items-center" key={idx}>
                  <Image src={Assets.Avatar} alt="avatar" className="w-20 h-20 rounded-full absolute -top-10" />
                  <span className="mt-15 text-[18px] font-semibold mb-2">{idx} Ipsum ipsum dolore.</span>
                  <span className="text-secondary text-xs">Sit lorem nisi doloremque debitis odio saepe Accusamus doloremque ex</span>
                  <Image src={Assets.QuoteL} alt="quote" className="mr-auto" />
                  <p className="text-sm font-medium px-10 my-3">Sit reiciendis dolorem laboriosam vero deserunt? Perspiciatis animi distinctio nihil reiciendis harum? Accusantium aut veniam incidunt aliquid magni Animi veritatis</p>
                  <Image className="ml-auto" src={Assets.QuoteR} alt="quote" />
                </div>
              </div>
            ))
          }
        </div>



      </div>

      <div className="relative z-10">
        <button onClick={() => emblaApi?.scrollPrev()}><Image className="w-12 h-12 mr-3" src={Assets.BlackArrowL} alt="prev" /></button>
        <button onClick={() => emblaApi?.scrollNext()}><Image className="w-12 h-12" src={Assets.BlackArrowR} alt="prev" /></button>
      </div>

    </div>
  )
}


export function CustomerStory() {
  const data = [1, 2, 3, 4]
  const [emblaRef, emblaApi] = useEmblaCarousel({

    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <div className="bg-[#fafafa] py-10 text-center">
      <h2 className="px-5 font-semibold text-[32px] mb-2 leading-none">Ipsum accusantium error beatae sit</h2>
      <p className="text-sm">Amet repellat quaerat nesciunt corporis quo Optio nihil ipsa expedita?</p>


      <div className="mt-10" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div className="w-full shrink-0 flex items-center justify-center px-5" key={idx}>

                <div className="bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]" key={idx}>
                  <Image className="object-cover" src={Assets.Cap} alt="" />
                  <div className="px-5 pt-4 pb-7 text-left">

                    <span className="bg-[#e5f2ff] border border-accent py-1 px-3.5 rounded-sm">Automotive</span>
                    <p className="my-2 font-semibold text-lg leading-none">Ipsum maiores voluptates ipsum magni impedit. Repellat autem nulla accusamus</p>
                    <p className="text-sm leading-3.5">Amet sit laboriosam aliquid reiciendis veniam deserunt? Odio inventore architecto unde vel exercitationem, vero Possimus hic culpa repellendus suscipit aliquam!</p>

                    <div>
                      <p>lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p>lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p>lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p>lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p>lorem: Consectetur possimus cum pariatur mollitia.</p>
                    </div>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>

      <div className="flex flex-row justify-center mt-10">
        <button className="mx-3" onClick={() => emblaApi?.scrollPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
        <button className="mx-3" onClick={() => emblaApi?.scrollNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
      </div>

    </div>
  )
}


export function Specification() {
  const data = [1, 2, 3, 4]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  const specs = [
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
  ]


  return (
    <div className="py-10 text-center">
      <h2 className="px-5 font-semibold text-[32px] mb-2 leading-none">Elit nisi itaque suscipit corrupti!</h2>
      <p className="px-5 text-sm">Lorem adipisci reprehenderit debitis eveniet dolorem perferendis esse? Obcaecati amet</p>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="shrink-0 w-305/390 bg-[#fafafa] rounded-lg overflow-hidden ml-5">
                <Image className="object-cover rounded-lg" src={Assets.Cap} alt="" />
                <div className="px-5 text-left">
                  <p className="my-5 text-lg font-semibold leading-none">Ipsum placeat officiis consequatur rem.</p>

                  {
                    specs.map((xs, idx) => (
                      <div className="flex flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
                        <span className="text-base">{xs.label}</span>
                        <span className="text-sm">{xs.value}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }

        </div>
      </div>


      <div className="flex flex-row justify-center mt-10">
        <button className="mx-3" onClick={() => emblaApi?.scrollPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
        <button className="mx-3" onClick={() => emblaApi?.scrollNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
      </div>
    </div>
  )

}


export function Equipment() {
  const data = [1, 2, 3, 4]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })


  return (
    <div className="text-center pt-10 pb-12.5 bg-[#fafafa]">
      <h2 className="px-5 text-[32px] font-semibold">Ipsum quod consequatur</h2>
      <p className="px-5 text-sm">Amet beatae totam expedita quae fugiat, voluptatum? A cupiditate cumque?</p>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row w-full">
          {
            data.map((xs, idx) => (
              <div key={idx} className="w-305/390 ml-5 shrink-0 text-left">
                <Image src={Assets.Cap} className="object-cover" alt="" />

                <div className="">
                  <p className="mt-6 mb-4 text-lg font-semibold">Dolor unde dolorem.</p>

                  <div className="border-b border-b-[#efefef] pb-6 mb-4">
                    {
                      data.map((xs, idx) => (
                        <p className="text-sm" key={idx}><span className="text-secondary">{idx}Brand: </span>lorem fdasfas fsdfsda vdsvdsv</p>
                      ))

                    }
                  </div>

                </div>

                <p className="text-accent text-sm font-medium flex flex-row items-center">View Product <Image className="ml-3 w-4 h-4" src={Assets.Link} alt="link" /></p>
              </div>
            ))
          }

        </div>
      </div>

      <div className="flex flex-row justify-center mt-10">
        <button className="mx-3" onClick={() => emblaApi?.scrollPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
        <button className="mx-3" onClick={() => emblaApi?.scrollNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
      </div>
    </div>
  )

}

export function WorkWith() {
  const data = [1, 2, 3, 4]

  return (
    <div className="relative text-center overflow-hidden">
      <Image src={Assets.Building} alt="building" className="object-cover object-[65%_10%] scale-150" fill />
      <div className="relative pt-10 pb-12.5 z-10 text-white bg-[rgba(0,0,0,0.5)]">
        <h2 className="font-semibold text-[32px] px-5 leading-none mb-2">Lorem quas magni voluptas dolore</h2>
        <p className="text-sm px-5 mb-5"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>

        <div className="grid grid-cols-2 px-5 gap-2.5">
          {
            data.map((xs, idx) => (
              <div className="bg-[rgba(0,0,0,0.3)] rounded-lg pt-5 pb-10 px-4 text-left min-h-16" key={idx}>
                <p className="text-accent font-semibold text-2xl mb-10">0{idx + 1}.</p>
                <p className="font-semibold text-base mb-3 leading-none">Elit inventore consectetur vitae quas?</p>
                <p className="text-sm leading-none">Dolor illo atque vero tempore iusto maxime ducimus dolorum Natus maiores minima error repellat id accusantium molestiae Maxime suscipit voluptatibus</p>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}

export function WorkShop() {
  const data = [1, 2, 3, 4]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  return (
    <div className="pt-5 pb-15">
      <div ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="ml-5 shrink-0 w-20/39">
                <Image src={Assets.Cap} alt="" className="rounded-lg mb-5" />
                <div>
                  <p className="text-base font-semibold mb-2 leading-none">Lorem ex hic sapiente adipisci.</p>
                  <p className="leading-none text-sm">Lorem minus assumenda harum natus praesentium beatae quos Molestias necessitatibus aspernatur laborum earum non eum. Odit hic consectetur nemo ex debitis Quasi iste dignissimos reiciendis beatae ipsam. Necessitatibus perspiciatis praesentium</p>
                </div>

              </div>
            ))
          }

        </div >
        <div className="flex flex-row justify-center mt-10">
          <button className="mx-3" onClick={() => emblaApi?.scrollPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.scrollNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>
    </div >
  )

}

export function FAQ() {
  const data = [1, 2, 3, 4, 5, 7, 8]

  return (
    <div className="text-center bg-[#fafafa] py-10">
      <h2 className="font-semibold text-[32px] px-5 leading-none mb-2">Lorem quas magni voluptas dolore</h2>
      <p className="text-sm leading-none px-5 mb-5"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>

      <div className="px-5 text-left mt-10">
        {
          data.map((xs, idx) => (
            <div className="py-5 border-b border-b-[#efefef]">
              <button className="flex flex-row items-start justify-start text-left ">
                <p className="text-base font-semibold">Consectetur impedit eligendi est ipsum molestias Consectetur suscipit dignissimos numquam harum ipsam, sunt nemo iusto Cupiditate nihil rerum quisquam quisquam aperiam? Aliquam voluptas molestiae dolorem cumque delectus Adipisci quis assumenda magni possimus molestias voluptas Accusantium id consectetur nemo aspernatur autem tenetur! Consequatur doloribus libero magni culpa ad. Provident blanditiis ullam?</p>
                <Image src={Assets.Plus} alt="plus" className="w-4 h-4 ml-5" />
              </button>

            </div>
          ))
        }


      </div>
    </div>
  )
}
