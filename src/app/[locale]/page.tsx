import { getMinimumHomePageData } from "@/lib/api";
import Home from "@/src/components/home";
import { Locale } from "../shared/types";

export default async function Page({ params }: { params: { locale: string } }) {
  const i18nLocale: Locale = params.locale === "en" ? "en-US" : "es";
  const homePage = await getMinimumHomePageData(i18nLocale);

  return <Home homePage={homePage} />;
}
