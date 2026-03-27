'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SayAbout() {
  const data = [1, 2, 3, 4]
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    breakpoints: {
      "(min-width: 1280px)": {
        align: "center",
        containScroll: false,
        loop: false,
      },
    },
  })

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    const onSelect = (_api: unknown, event: { detail: { targetSnap: number } }) => {
      setSelectedIndex(event.detail.targetSnap);
    };

    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <div className="relative text-center pt-10 pb-15 xl:pt-20 xl:pb-27.25">
      <Image src={Assets.Map} fill alt="map" className="object-cover" />
      <div className="relative z-10">
        <h2 className="text-[32px] font-semibold px-5 mb-2 xl:text-5xl xl:mb-3">Dolor facere nulla voluptatem eaque nulla nam aut. Ducimus mollitia!</h2>
        <p className="px-5 text-sm mb-18.5 xl:text-base xl:mb-25">Lorem architecto quod aperiam iste dignissimos Commodi repellat explicabo quisquam!</p>
      </div>

      <div className="relative overflow-hidden z-10 py-10 xl:max-w-420 xl:mx-auto" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div
                className={`basis-full min-w-0 shrink-0 flex justify-center items-center xl:basis-1/3 xl:transition-all xl:duration-300 ${selectedIndex === idx ? "xl:scale-100" : "xl:scale-70"}`}
                key={idx}
              >
                <div className={`bg-white w-87.5 h-90 rounded-lg flex flex-col shrink-0 px-5 items-center shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] xl:w-full xl:max-w-none`} key={idx}>
                  <Image src={Assets.Avatar} alt="avatar" className="absolute w-20 h-20 -top-10 rounded-full" />
                  <span className="mt-15 text-[18px] font-semibold mb-2">{idx} Ipsum ipsum dolore.</span>
                  <span className="text-secondary text-xs">Sit lorem nisi doloremque debitis odio saepe Accusamus doloremque ex</span>
                  <Image src={Assets.QuoteL} alt="quote" className="mr-auto xl:-mb-4" />
                  <p className="text-sm font-medium px-10 my-3">Sit reiciendis dolorem laboriosam vero deserunt? Perspiciatis animi distinctio nihil reiciendis harum? Accusantium aut veniam incidunt aliquid magni Animi veritatis</p>
                  <Image className="ml-auto" src={Assets.QuoteR} alt="quote" />
                  <div className={cn("hidden absolute inset-0 bg-[rgba(250,250,250,0.8)] transition-opacity duration-300 xl:flex", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                  <div className={cn("hidden absolute w-20 h-10 -top-10 rounded-tl-full rounded-tr-full bg-[rgba(250,250,250,0.8)] transition-opacity duration-300 xl:flex", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="hidden flex-row mx-auto justify-center xl:flex">
        {
          [1, 2, 3, 4, 5].map((xs, idx) => (
            <div key={idx} className="">
              <p className={`'text-xs ${selectedIndex === idx ? 'text-[#666]' : 'text-[#bfbfbf]'}`}>0{idx + 1}</p>
              <div className={cn("h-1 w-12 border-b border-l border-[#efefef] last:border-r", selectedIndex === idx ? 'border-secondary' : '')}></div>
            </div>
          ))
        }

      </div>

      <div className="flex flex-row justify-center relative z-10 xl:w-168 xl:mx-auto xl:-top-60 xl:justify-between">
        <button type="button" onClick={() => emblaApi?.goToPrev()}><Image className="w-12 h-12 mr-3 xl:w-10 xl:h-10 xl:mr-0" src={Assets.BlackArrowL} alt="prev" /></button>
        <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 xl:w-10 xl:h-10" src={Assets.BlackArrowR} alt="next" /></button>
      </div>


    </div>
  )
}


export function CustomerStory() {
  const data = [1, 2, 3, 4]

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({

    align: "start",
    containScroll: "trimSnaps",
  })

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    const onSelect = (_api: unknown, event: { detail: { targetSnap: number } }) => {
      setSelectedIndex(event.detail.targetSnap);
    };

    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <div className="bg-[#fafafa] py-10 text-center relative xl:pt-20 xl:pb-19">
      <h2 className="px-5 font-semibold text-[32px] mb-2 leading-none xl:text-5xl xl:mb-3">Ipsum accusantium error beatae sit</h2>
      <p className="text-sm xl:text-base">Amet repellat quaerat nesciunt corporis quo Optio nihil ipsa expedita?</p>


      <div className="py-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div className="w-full shrink-0 flex items-center justify-center px-5" key={idx}>

                <div
                  className="flex flex-col bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] xl:flex-row xl:w-7xl xl:h-130"
                  key={idx}>
                  <Image className="object-cover xl:w-160" src={Assets.Cap} alt="" />
                  <div className="flex flex-col px-5 pt-4 pb-7 text-left xl:px-10 xl:pt-6 xl:pb-8">
                    <span className="self-start leading-8 bg-[#e5f2ff] border border-accent h-8 px-3.5 font-semibold rounded-sm inline-block xl:text-lg xl:h-10 xl:leading-10">Automotive</span>
                    <p className="my-2 font-semibold text-lg leading-none xl:mt-4 xl:mb-3 xl:text-[32px]">Ipsum maiores voluptates ipsum magni impedit. Repellat autem nulla accusamus</p>
                    <p className="text-sm leading-3.5 xl:text-base xl:leading-5">Amet sit laboriosam aliquid reiciendis veniam deserunt? Odio inventore architecto unde vel exercitationem, vero Possimus hic culpa repellendus suscipit aliquam!</p>

                    <div className="xl:mt-6.5 xl:text-base flex-1">
                      <p className="">lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p className="">lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p className="">lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p className="">lorem: Consectetur possimus cum pariatur mollitia.</p>
                      <p className="">lorem: Consectetur possimus cum pariatur mollitia.</p>
                    </div>

                    <div className="hidden text-right text-accent text-base justify-end font-medium items-center xl:flex">
                      <p className="mr-2">Read Full Case Study</p>
                      <Image src={Assets.ArrowR} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>

      <div className="hidden xl:flex mx-auto justify-center">
        {
          [1, 2, 3, 4, 5].map((xs, idx) => (
            <div key={idx}>
              <p className={`text-xs ${selectedIndex === idx ? 'text-[#666]' : 'text-[#bfbfbf]'}`}>0{idx + 1}</p>
              <div className={`w-12 h-1 border-b border-l ${selectedIndex === idx ? 'border-secondary' : 'border-[#efefef]'} last:border-r`}></div>

            </div>
          ))
        }

      </div>

      <div className="flex w-full flex-row justify-center xl:absolute xl:top-110">
        <div className="flex flex-row xl:w-355 xl:justify-between">
          <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>

    </div>
  )
}


export function Specification() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]
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
    <div className="relative py-10 text-center xl:py-20 xl:w-7xl xl:mx-auto">
      <h2 className="px-5 font-semibold text-[32px] mb-2 leading-none xl:text-5xl xl:mb-3 xl:text-left">Elit nisi itaque suscipit corrupti!</h2>
      <p className="px-5 text-sm xl:text-base xl:text-left">Lorem adipisci reprehenderit debitis eveniet dolorem perferendis esse? Obcaecati amet</p>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="shrink-0 w-305/390 bg-[#fafafa] rounded-lg overflow-hidden ml-5 xl:w-76.25">
                <Image className="object-cover rounded-lg xl:h-40" src={Assets.Cap} alt="" />
                <div className="px-5 text-left">
                  <p className="my-5 text-lg font-semibold leading-none">Ipsum placeat officiis consequatur rem.</p>

                  {
                    specs.map((xs, idx) => (
                      <div key={idx} className="flex flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
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


      <div className="flex flex-row justify-center mt-10 xl:absolute xl:top-20 xl:right-0">
        <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
        <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
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
    <div className="text-center pt-10 pb-12.5 bg-[#fafafa] xl:text-left xl:pt-20 xl:pb-20">
      <div className="relative xl:text-left xl:w-7xl xl:mx-auto">
        <h2 className="px-5 text-[32px] font-semibold leading-none mb-2 xl:text-5xl xl:mb-3 xl:px-0">Ipsum quod consequatur</h2>
        <p className="px-5 text-sm xl:text-base xl:px-0">Amet beatae totam expedita quae fugiat, voluptatum? A cupiditate cumque?</p>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row w-full">
            {
              data.map((xs, idx) => (
                <div key={idx} className="w-305/390 ml-5 shrink-0 text-left xl:w-76.25 xl:ml-0 xl:mr-5">
                  <Image src={Assets.Cap} className="object-cover xl:h-55" alt="" />

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

        <div className="flex flex-row justify-center mt-10 xl:absolute xl:top-0 xl:right-0">
          <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>
    </div>
  )

}

export function WorkWith() {
  const data = [1, 2, 3, 4]

  return (
    <div className="relative text-center overflow-hidden">
      <Image src={Assets.Building} alt="building" className="object-cover object-[65%_10%] scale-150 xl:object-[0%_40%]" fill />
      <div className="relative pt-10 pb-12.5 z-10 text-white bg-[rgba(0,0,0,0.5)] xl:pt-15 xl:pb-15">
        <h2 className="font-semibold text-[32px] px-5 leading-none mb-2 xl:text-5xl">Lorem quas magni voluptas dolore</h2>
        <p className="text-sm px-5 mb-5 xl:text-base"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>

        <div className="grid grid-cols-2 px-5 gap-2.5 xl:grid-cols-4 xl:w-7xl xl:mx-auto">
          {
            data.map((xs, idx) => (
              <div className="bg-[rgba(0,0,0,0.3)] rounded-lg pt-5 pb-10 px-4 text-left min-h-16" key={idx}>
                <p className="text-accent font-semibold text-2xl mb-10">0{idx + 1}.</p>
                <p className="font-semibold text-base mb-3 leading-none: xl:text-lg xl:leading-5">Elit inventore consectetur vitae quas?</p>
                <p className="text-sm leading-none xl:text-[15px]">Dolor illo atque vero tempore iusto maxime ducimus dolorum Natus maiores minima error repellat id accusantium lorem lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem   molestiae Maxime suscipit voluptatibus</p>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}

export function WorkShop() {
  const data = [1, 2, 3, 4, 5, 6]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  return (
    <div className="pt-5 pb-15">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="ml-5 shrink-0 w-20/39 xl:w-100">
                <Image src={Assets.Cap} alt="" className="rounded-lg mb-5" />
                <div>
                  <p className="text-base font-semibold mb-2 leading-none xl:text-lg">Lorem ex hic sapiente adipisci.</p>
                  <p className="leading-none text-sm">Lorem minus assumenda harum natus praesentium beatae quos Molestias necessitatibus aspernatur laborum earum non eum. Odit hic consectetur nemo ex debitis Quasi iste dignissimos reiciendis beatae ipsam. Necessitatibus perspiciatis praesentium</p>
                </div>

              </div>
            ))
          }

        </div >
        <div className="flex flex-row justify-center mt-10">
          <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>
    </div >
  )

}

export function FAQ() {
  const data = [1, 2, 3, 4, 5, 7, 8]
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#fafafa] py-10">
      <div className="flex flex-col text-center xl:flex-row xl:w-7xl xl:mx-auto">
        <div className="xl:mr-42.5">
          <h2 className="font-semibold text-[32px] px-5 leading-none mb-2 xl:text-5xl xl:mb-3 xl:px-0">Lorem quas magni voluptas dolore</h2>
          <p className="text-sm leading-none px-5 xl:text-base xl:px-0"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>
        </div>

        <div className="px-5 text-left mt-10 xl:mt-0">
          {
            data.map((xs, idx) => (
              <div className="py-5 border-b border-b-[#efefef]" key={idx}>
                <button
                  type="button"
                  className="flex flex-row items-start justify-start text-left w-full"
                  onClick={() => setOpenIndex((current) => current === idx ? null : idx)}
                >
                  <p className="text-base font-semibold">Consectetur impedit eligendi est ipsum molestias Consectetur suscipit dignissimos numquam harum ipsam, sunt nemo iusto Cupiditate nihil rerum quisquam quisquam aperiam? Aliquam voluptas molestiae dolorem cumque delectus Adipisci quis assumenda magni possimus molestias voluptas Accusantium id consectetur nemo aspernatur autem tenetur! Consequatur doloribus libero magni culpa ad. Provident blanditiis ullam?</p>
                  <Image src={openIndex === idx ? Assets.Minus : Assets.Plus} alt="plus" className="w-4 h-4 ml-5 mt-5" />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${openIndex === idx ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-6 pr-9 pb-10">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloremque
                      asperiores eveniet minima laboriosam, quaerat aliquam. Ipsum architecto
                      corporis commodi, molestiae cumque nam, quas deleniti eveniet temporibus
                      officiis rem dolor.
                    </p>
                  </div>
                </div>
              </div>
            ))
          }


        </div>
      </div>
    </div >
  )
}
