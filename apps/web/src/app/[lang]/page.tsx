import { defaultLocale, isLocale } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  try {
    const response = await getHomePage(locale);
    homeData = response.data;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  return (
    <div></div>
  );
}
