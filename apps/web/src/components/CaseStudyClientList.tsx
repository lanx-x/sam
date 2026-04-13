'use client';

import { CaseStudy, StrapiCollectionResponse } from "cms-types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getStrapiMedia } from "@/utils/strapi";
import { Assets } from "@/assets";

type Props = {
  data: StrapiCollectionResponse<CaseStudy>;
  pageSize: number;
  basePath: string;
};

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

export function CaseStudyClientList({ data, pageSize, basePath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const total = data.meta.pagination?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const setPage = useCallback((p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(p));
    }
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="my-10 xl:my-12.5 px-5 xl:px-0">
      <div className="xl:w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-5">
          {data.data.map((xs) => (
            <Link
              target="_blank"
              key={xs.id}
              href={`${basePath}/${xs.documentId}`}
              className="cursor-pointer relative xl:p-2.5 group rounded-xl duration-300 transition-colors overflow-hidden bg-white hover:bg-[rgba(0,118,238,0.1)]">
              <div className="relative rounded-xl aspect-350/285 xl:aspect-413/336 w-full overflow-hidden">
                <Image
                  fill
                  src={getStrapiMedia(xs.image) ?? ""}
                  alt=""
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pb-7 mt-5 text-left">
                <p className="text-lg font-semibold leading-none mb-2">{xs.title}</p>
                <p className="text-sm text-primary/66 leading-5 line-clamp-2">{xs.desc}</p>
              </div>

              {
                xs.industry?.name &&
                <span className="absolute top-4 xl:top-6.5 left-3 xl:left-5.5 inline-block text-sm bg-[#e5f2ff] border border-accent px-2 py-1 rounded-sm font-semibold">
                  {xs.industry?.name}
                </span>
              }
            </Link>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-20">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="cursor-pointer text-sm  rounded-sm mr-20 disabled:opacity-40 border border-transparent disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
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
              className="rounded-sm disabled:opacity-40 cursor-pointer ml-20 border border-transparent disabled:cursor-not-allowed hover:border-accent transition-colors"
            >
              <Image className="w-10 h-10 object-cover" src={Assets.CaretSmallRight} alt="next" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
