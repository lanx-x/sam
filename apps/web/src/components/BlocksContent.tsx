"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiURL } from "@/utils/strapi";

export function BlocksContent({ content }: { content: any }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          const url = image.url?.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, getStrapiURL());
          return <img src={url} alt={image.alt || ""} className="max-w-full" />;
        }
      }}
    />
  );
}
