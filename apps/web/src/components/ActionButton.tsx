"use client";

import { cn } from "@/utils/cn";
import { withLocalePath } from "@/utils";
import type { Action } from "cms-types";
import Link from "next/link";
import { useGetQuoteDialog } from "./GetQuoteDialog";

type ActionButtonProps = {
  action: Action;
  className?: string;
  locale?: string;
};

export function ActionButton({ action, className, locale }: ActionButtonProps) {
  const { open } = useGetQuoteDialog();
  const { label, target_type, target_url } = action;
  const classes = cn(
    "h-13 px-4 rounded-sm text-white bg-accent font-medium truncate flex items-center justify-center",
    "transition-colors disabled:opacity-50",
    className,
  );

  switch (target_type) {
    case 'external_url':
      return (
        <a href={target_url ?? ""} target="_blank" rel="noopener noreferrer" className={classes}>
          {label}
        </a>
      );
    case 'internal_page':
      return (
        <Link target="_blank" href={withLocalePath(locale ?? '', target_url!)} className={classes}>
          {label}
        </Link>
      );
    case 'popup':
      return <button type="button" className={classes} onClick={open}>{label}</button>;
    default:
      return <button className={classes}>{label}</button>;
  }
}
