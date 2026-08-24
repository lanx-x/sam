import Image from "next/image";
import { Assets } from "@/assets";
import { cn } from "@/utils/cn";

type GetQuoteSuccessProps = {
  title?: string | null;
  tips?: string | null;
};

export function GetQuoteSuccess({ title, tips }: GetQuoteSuccessProps) {
  return (
    <div className={cn("bg-[#f6f8fa] min-h-[calc(100vh-100px)]")}>
      <div className="xl:w-7xl xl:mx-auto px-5 xl:px-0 pb-20">
        <div className="flex-col items-center justify-center mt-45">
          <Image src={Assets.SuccessPageIcon} alt="done" className="w-70 mx-auto aspect-28/15" />
          <h1 className="text-black text-2xl mt-15 mb-5 text-center">{title}</h1>
          <p className="text-[#666] text-base my-0 text-center">{tips}</p>
        </div>
      </div>
    </div>
  );
}
