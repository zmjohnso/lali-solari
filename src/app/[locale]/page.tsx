import { getMinimumHomePageData } from "@/lib/api";
import { HomePage } from "@/lib/types";
import Home from "@/src/components/home";
import getBase64 from "@/src/shared/getBase64";
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

  const sortedItems = homePage?.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );

  if (!sortedItems) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  const sortedItemsWithBase64: HomePage[] = await Promise.all(
    sortedItems.map(async (photo) => ({
      ...photo,
      base64: await getBase64(photo.thumbnail.url),
    }))
  );

  return <Home homePage={sortedItemsWithBase64} />;
}
