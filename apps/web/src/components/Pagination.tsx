'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Assets } from "@/assets";
import Image from "next/image";

function generatePages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');

  pages.push(total);
  return pages;
}

export function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setPage = useCallback((p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(p));
    }
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-20">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="cursor-pointer text-sm rounded-sm xl:mr-20 disabled:opacity-40 border border-transparent disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
      >
        <Image className="w-10 h-10 object-cover" src={Assets.CaretSmallLeft} alt="prev" />
      </button>

      {generatePages(page, pageCount).map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-[#a3a3a3]">...</span>
        ) : (
          <button
            key={item}
            onClick={() => setPage(item as number)}
            className={`w-10 h-10 cursor-pointer text-sm rounded-sm border border-transparent transition-colors hover:border-accent hover:text-accent ${item === page ? 'bg-[#e8e8e8] text-[#040f0f]' : ''}`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= pageCount}
        className="rounded-sm disabled:opacity-40 cursor-pointer xl:ml-20 border border-transparent disabled:cursor-not-allowed hover:border-accent transition-colors"
      >
        <Image className="w-10 h-10 object-cover" src={Assets.CaretSmallRight} alt="next" />
      </button>
    </div>
  );
}
