"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Assets } from "@/assets";
import { cn } from "@/utils/cn";

type GetQuoteSuccessProps = {
  title?: string | null;
  tips?: string | null;
};

export function GetQuoteSuccess({ title, tips }: GetQuoteSuccessProps) {
  const router = useRouter();

  return (
    <div className={cn("bg-[#f6f8fa] min-h-[calc(100vh-100px)]")}>
      <div className="xl:w-7xl xl:mx-auto px-5 xl:px-0 pb-20">
        <div className="flex-col items-center justify-center mt-45">
          <Image src={Assets.SuccessPageIcon} alt="done" className="w-70 mx-auto aspect-28/15" />
          <h1 className="text-black text-2xl mt-15 mb-5 text-center">{title}</h1>
          <p className="text-[#666] text-base my-0 text-center">{tips}</p>

          <button type="button" className="w-40 h-12 rounded-sm bg-accent mt-10 block mx-auto" onClick={() => router.back()}>
            <span className="text-white text-sm font-medium">Return</span>
          </button>
        </div>
      </div>
    </div>
  );
}
