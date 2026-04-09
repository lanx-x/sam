import { cn } from "@/utils/cn";
import { withLocalePath } from "@/utils";
import type { Action } from "cms-types";
import Link from "next/link";

type ActionButtonProps = {
  action: Action;
  className?: string;
  locale?: string;
};

export function ActionButton({ action, className, locale }: ActionButtonProps) {
  const { label, target_type, target_url } = action;
  const classes = cn(
    "h-13 px-4 rounded-sm text-white bg-primary font-medium truncate flex items-center justify-center",
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
        <Link href={withLocalePath(locale ?? '', target_url!)} className={classes}>
          {label}
        </Link>
      );
    case 'popup':
      // TODO: implement toast
      return <button className={classes}>{label}</button>;
    default:
      return <button className={classes}>{label}</button>;
  }
}
