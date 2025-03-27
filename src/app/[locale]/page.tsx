import { getMinimumHomePageData } from "@/lib/api";
import Home from "@/src/components/home";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";
import { setRequestLocale } from "next-intl/server";

export default async function RootPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  // Enable static rendering
  setRequestLocale(params.locale);

  const homePage = await getMinimumHomePageData(
    getContentfulLocale(params.locale)
  );

  const sortedItems = homePage?.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );

  if (!sortedItems) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return <Home homePage={sortedItems} />;
}
