import { getMinimumHomePageData } from "@/lib/api";
import Home from "@/src/components/home";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";

export default async function RootPage({
  params,
}: {
  params: { locale: string };
}) {
  const homePage = await getMinimumHomePageData(
    getContentfulLocale(params.locale)
  );

  const sortedItems = homePage.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );

  return <Home homePage={sortedItems} />;
}
