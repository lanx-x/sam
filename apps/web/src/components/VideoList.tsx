import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import { VideoClientList } from "./VideoClientList";

const PAGE_SIZE = 12;

export async function VideoList({ section, searchParams, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const page = Number(searchParams?.page) || 1
  const data = await api.getVideo({
    'pagination[page]': page,
    'pagination[pageSize]': PAGE_SIZE,
  })

  return <VideoClientList data={data} pageSize={PAGE_SIZE} />
}
