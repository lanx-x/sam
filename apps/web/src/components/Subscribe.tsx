'use client';

import type { ComponentProps } from "react";
import { cn } from "@/utils/cn"

type Props = ComponentProps<"div"> & { label?: string, placeholder?: string };

export function Subscribe({ className, label, placeholder }: Props) {

  return (
    <div className={cn("bg-bg w-full h-12 rounded-sm flex flex-row justify-start overflow-hidden", className)}>
      <input className="flex-1 text-sm h-full border-none text-primary px-4 placeholder:text-secondary" type="email" placeholder={placeholder ?? "Enter your business email"} />
      <button className="bg-accent h-full w-30 text-white">{label ?? "subscribe"}</button>
    </div>
  )
}
