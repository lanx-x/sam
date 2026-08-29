'use client';

import { Video, StrapiCollectionResponse } from "cms-types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { getStrapiMedia } from "@/utils/strapi";
import { Pagination } from "./Pagination";

type Props = {
  data: StrapiCollectionResponse<Video>;
  pageSize: number;
};

export function getVideoMeta(video: Video) {
  const isExternal = video.type === 'external';

  if (isExternal) {
    const oembed = video.external as any;
    const meta = video.overwrite_meta as any;
    return {
      title: meta?.title || oembed?.oembed?.title || '',
      desc: meta?.desc || oembed?.oembed?.author_name || '',
      thumbnail: meta?.thumbnail || oembed?.thumbnail || oembed?.oembed?.thumbnail_url || null,
      html: oembed?.oembed?.html || null,
      url: oembed?.url || null,
      isExternal: true,
    };
  }

  const internal = video.internal as any;
  return {
    title: internal?.title || '',
    desc: internal?.desc || '',
    thumbnail: internal?.thumbnail || null,
    videoSrc: internal?.video ? getStrapiMedia(internal.video) : null,
    isExternal: false,
  };
}

export function VideoClientList({ data, pageSize }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const pageCount = data.meta.pagination?.pageCount ?? 0;
  const [activeVideo, setActiveVideo] = useState<ReturnType<typeof getVideoMeta> | null>(null);

  return (
    <div className="my-12.5 px-5 xl:px-0">
      <div className="xl:w-7xl xl:mx-auto">
        <div className="grid grid-cols-1 gap-y-5 xl:grid-cols-3">
          {data.data.map((video) => {
            const meta = getVideoMeta(video);
            const thumbnailSrc = meta.thumbnail
              ? (typeof meta.thumbnail === 'string' && meta.thumbnail.startsWith('data:'))
                ? meta.thumbnail
                : getStrapiMedia(meta.thumbnail)
              : null;

            return (
              <button
                key={video.documentId}
                onClick={() => setActiveVideo(meta)}
                className="cursor-pointer! group text-left duration-300 transition-colors rounded-xl overflow-hidden bg-white hover:bg-[rgba(0,118,238,0.1)] xl:p-2.5 xl:h-87.5 flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#f5f5f5] cursor-pointer">
                  {thumbnailSrc ? (
                    <Image fill src={thumbnailSrc} alt="" className="w-full object-cover pointer-events-none" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary text-sm">No Thumbnail</div>
                  )}
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-lg font-semibold leading-none mb-2 group-hover:text-accent line-clamp-1 mt-5">{meta.title}</p>
                  <p className="text-sm text-[rgba(34,34,34,0.66)] leading-5 line-clamp-2">{meta.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Pagination page={page} pageCount={pageCount} />
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-7xl mx-5 bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {activeVideo.isExternal ? (
              <div
                className="aspect-video w-full [&>iframe]:w-full [&>iframe]:h-full"
                dangerouslySetInnerHTML={{ __html: activeVideo.html || '' }}
              />
            ) : (
              activeVideo.videoSrc && (
                <video
                  className="w-full aspect-video"
                  controls
                  autoPlay
                  src={activeVideo.videoSrc as string}
                />
              )
            )}

            {(activeVideo.title || activeVideo.desc) && (
              <div className="p-4 text-white">
                {activeVideo.title && <p className="text-lg font-semibold">{activeVideo.title}</p>}
                {activeVideo.desc && <p className="text-sm text-white/70 mt-1">{activeVideo.desc}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
