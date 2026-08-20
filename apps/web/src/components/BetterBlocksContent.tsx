"use client";

import {
  BlocksRenderer,
  type BlocksContent as BetterBlocksContentValue,
} from "@qkix/better-blocks-react-renderer";

export function BetterBlocksContent({ content }: { content: BetterBlocksContentValue }) {
  return (
    <div>
      <BlocksRenderer
        content={content}
        blocks={{
          table: ({ children }) => (
            <table className="my-4 w-full min-w-full table-fixed border-collapse border border-[#d0d7de]">
              <tbody>{children}</tbody>
            </table>
          ),
          "table-row": ({ children }) => (
            <tr className="odd:bg-[#f6f8fa]">{children}</tr>
          ),
          "table-header-cell": ({ children, align, colSpan, rowSpan, style }) => (
            <th
              scope="col"
              colSpan={colSpan}
              rowSpan={rowSpan}
              style={style}
              className={
                [
                  "border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 font-semibold text-[#1f2937]",
                  align === "center" ? "text-center" : "",
                  align === "right" ? "text-right" : "text-left",
                ].join(" ")
              }
            >
              {children}
            </th>
          ),
          "table-cell": ({ children, align, colSpan, rowSpan, style }) => (
            <td
              colSpan={colSpan}
              rowSpan={rowSpan}
              style={style}
              className={
                [
                  "border border-[#d0d7de] px-3 py-2 text-[#374151]",
                  align === "center" ? "text-center" : "",
                  align === "right" ? "text-right" : "text-left",
                ].join(" ")
              }
            >
              {children}
            </td>
          ),
          image: ({ image, caption }) => {
            const path = image.url?.replace(/^https?:\/\/[^/]+/, "");
            const src = path ? `/proxy-via-next${path}` : image.url;

            return (
              <figure className="my-6">
                <img src={src} alt={image.alternativeText || ""} className="max-w-full" />
                {caption ? <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption> : null}
              </figure>
            );
          },
        }}
      />
    </div>
  );
}
