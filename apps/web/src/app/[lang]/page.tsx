import { Stats } from "fs";
import { Hero } from "@/components/Hero";
import { OneStop } from "@/components/OneStop";
import { getHomePage, type HomePageData } from "@/api";
import { defaultLocale, isLocale } from "@/i18n";
import { Stat } from "@/components/Stat";
import { Cap } from "@/components/Cap";
import { Comment } from "@/components/Comment";
import { Spe } from "@/components/Spe";
import { WorkWith } from "@/components/WorkWith";
import { WorkShop } from "@/components/WorkShop";
import { FAQ } from "@/components/FAQ";
import { CustomerStory } from "@/components/CustomerStory";
import { Equipment } from "@/components/Equipment";

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
