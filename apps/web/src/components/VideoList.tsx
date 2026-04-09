import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getVideo } from "@/api";
import { VideoClientList } from "./VideoClientList";

const PAGE_SIZE = 12;

export async function VideoList({ section, searchParams }: CmpProps) {
  const page = Number(searchParams?.page) || 1
  const data = await getVideo({
    'pagination[page]': page,
    'pagination[pageSize]': PAGE_SIZE,
  })

  return <VideoClientList data={data} pageSize={PAGE_SIZE} />
}
