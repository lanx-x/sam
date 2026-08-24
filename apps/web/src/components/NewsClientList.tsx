'use client';

import { News, NewsCategory, StrapiCollectionResponse } from "cms-types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getStrapiMedia } from "@/utils/strapi";
import { Pagination } from "./Pagination";
import dayjs from "dayjs";
import { extractBlockText } from "@/utils";
import { buildDynamicDetailPathFromBase } from "@/utils/dynamic-routes";

type Props = {
  data: StrapiCollectionResponse<News>;
  pageSize: number;
  categories: NewsCategory[];
  activeCategoryId?: string;
  basePath: string;
};

export function NewsClientList({ data, pageSize, categories, activeCategoryId, basePath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const pageCount = data.meta.pagination?.pageCount ?? 0;

  const setCategory = useCallback((catId: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (catId) {
      params.set('category', catId);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="my-10">
      <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto">
        <div className="flex gap-3 mb-10 overflow-scroll">
          {categories.map(cat => {
            const docId = cat.documentId
            const active = cat.isAll ? !activeCategoryId : activeCategoryId === docId
            return (
              <button
                key={cat.documentId}
                onClick={() => setCategory(cat.isAll ? undefined : docId)}
                className={`flex shrink-0 items-center gap-3 px-6.25 py-3.5 text-base font-medium rounded-xl transition-colors ${active ? 'bg-[#e8e8e8]' : 'hover:bg-[#e8e8e8]'}`}
              >
                {cat.image && <Image width={20} height={20} src={getStrapiMedia(cat.image) ?? ""} alt="cate" className="w-4 h-4 object-cover" />}
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {data.data.map((xs) => (
            <Link target="_blank" key={xs.id} href={buildDynamicDetailPathFromBase(basePath, "news", xs)} className="cursor-pointer relative group duration-300 transition-colors overflow-hidden bg-white border-b border-[#efefef] hover:border-accent">

              <div className="h-full pb-5 border-b border-transparent group-hover:border-accent">
                <div className="aspect-162/91 relative">
                  <Image fill src={getStrapiMedia(xs.image) ?? ""} alt="" className="w-full object-cover rounded-xl" />
                </div>
                <p className="text-lg font-semibold mt-4 mb-2 leading-none group-hover:text-accent">{xs.title}</p>
                <span className="text-secondary leading-none">{dayjs(xs.date as string).format('YYYY-MM-DD')}</span>
                <p className="shrink-0 leading-none line-clamp-2 flex-1 mt-2">{xs.desc || extractBlockText(xs.content)}</p>
              </div>
            </Link>
          ))}
        </div>

        <Pagination page={page} pageCount={pageCount} />
      </div>
    </div>
  );
}
