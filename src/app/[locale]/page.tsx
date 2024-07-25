import { getMinimumHomePageData } from "@/lib/api";
import Home from "@/src/components/home";
import { getContentfulLocale } from "@/src/shared/utilities";

export default async function Page({ params }: { params: { locale: string } }) {
  const homePage = await getMinimumHomePageData(
    getContentfulLocale(params.locale)
  );

  return <Home homePage={homePage} />;
}
