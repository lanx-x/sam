"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function BlocksContent({ content }: { content: any }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          // FIXME: 所有图片 URL 都走 proxy-via-next 代理。
          // 如果富文本中包含外部图床图片（如 https://imgur.com/uploads/a.png），
          // 路径恰好以 /uploads/ 开头时会被错误代理，导致图片加载失败。
          const path = image.url?.replace(/^https?:\/\/[^/]+/, "");
          const src = path ? `/proxy-via-next${path}` : image.url;
          return <img src={src} alt={image.alternativeText || ""} className="max-w-full" />;
        }
      }}
    />
  );
}
