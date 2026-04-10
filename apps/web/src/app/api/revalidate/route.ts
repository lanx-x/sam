import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  if (!SECRET) {
    logger.error("[Revalidate] REVALIDATE_SECRET not set");
    return NextResponse.json({ message: "REVALIDATE_SECRET not set" }, { status: 500 });
  }

  if (request.headers.get("authorization") !== `Bearer ${SECRET}`) {
    logger.warn("[Revalidate] Invalid token", request.headers.get("authorization"));
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.tag) {
      const tags = [body.tag].flat();
      for (const tag of tags) {
        revalidateTag(tag, 'max');
      }
      logger.info(`[Revalidate] Revalidated tags: ${tags.join(", ")}`);
      return NextResponse.json({ revalidated: true, tag: body.tag });
    }

    revalidatePath("/", "layout");
    logger.info("[Revalidate] Revalidated all paths");
    return NextResponse.json({ revalidated: true, scope: "all" });
  } catch {
    logger.error("[Revalidate] Invalid request body");
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
}
