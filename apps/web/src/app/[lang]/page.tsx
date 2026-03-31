import { Stats } from "fs";
import { Hero } from "./_components/Hero";
import { OneStop } from "./_components/OneStop";
import { getHomePage, type HomePageData } from "@/api";
import { defaultLocale, isLocale } from "@/i18n";
import { Stat } from "./_components/Stat";
import { Cap } from "./_components/Cap";
import { Comment } from "./_components/Comment";
import { CustomerStory } from "./_components/CustomerStory";
import { Spe } from "./_components/Spe";
import { Equipment } from "./_components/Equipment";
import { WorkWith } from "./_components/WorkWith";
import { WorkShop } from "./_components/WorkShop";
import { FAQ } from "@/components/FAQ";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  let homeData: HomePageData | null = null;

  try {
    const response = await getHomePage(locale);
    homeData = response.data;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  return (
    <div>
      <Hero data={homeData?.hero ?? undefined} />
      <Stat stats={homeData?.stats ?? undefined} />
      <Cap cap={homeData?.cap ?? undefined} />
      <OneStop />
      <Comment />
      <CustomerStory />
      <Spe />
      <Equipment />
      <WorkWith />
      <WorkShop />
      <FAQ />
    </div>
  );
}
