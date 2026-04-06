import { CommonSection } from "cms-types";
import { getVideo } from "@/api";
import { VideoClientList } from "./VideoClientList";

const PAGE_SIZE = 12;

export async function VideoList({ section, searchParams }: { section: CommonSection; searchParams: { [key: string]: string | string[] | undefined } }) {
  const page = Number(searchParams?.page) || 1
  const data = await getVideo({
    'pagination[page]': page,
    'pagination[pageSize]': PAGE_SIZE,
  })

  return <VideoClientList data={data} pageSize={PAGE_SIZE} />
}
