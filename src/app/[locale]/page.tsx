import { getMinimumHomePageData } from "@/lib/api";
import Home from "@/src/components/home";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function RootPage({
  params,
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const homePage = await getMinimumHomePageData(
    getContentfulLocale(params.locale)
  );

  const sortedItems = homePage.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );

  return <Home homePage={sortedItems} params={params} />;
}
