import { cache } from "react";
import { getGalleryDisplayPageData } from "@/lib/api";
import GalleryDisplay from "@/src/components/galleryDisplay";
import getBase64 from "@/src/shared/getBase64";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";
import { unstable_setRequestLocale } from "next-intl/server";
import { ContentfulLocale } from "@/lib/types";

const cachedGetGalleryDisplayPageData = cache(getGalleryDisplayPageData);

export async function generateStaticParams() {
  const locales: ContentfulLocale[] = ["en-US", "es"];
  const params = await Promise.all(
    locales.map(async (locale) => {
      const galleryDisplayPage = await cachedGetGalleryDisplayPageData(locale);
      return galleryDisplayPage?.map((item) => ({
        locale: locale,
        id: item.thumbnail.sys.id,
      }));
    })
  );

  return params.flat();
}

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(params.locale);

  const galleryDisplayPage = await cachedGetGalleryDisplayPageData(
    getContentfulLocale(params.locale)
  );
  const mainPhoto = galleryDisplayPage?.find(
    (item) => item.thumbnail.sys.id === params.id
  );
  const galleryItems = galleryDisplayPage?.filter(
    (item) => item.gallery.name === mainPhoto?.gallery.name
  );
  const sortedGalleryItems = galleryItems?.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );
  const mainPhotoBlurUrl = mainPhoto?.photo.url
    ? await getBase64(mainPhoto.photo.url)
    : undefined;

  if (!mainPhoto || !mainPhotoBlurUrl || !sortedGalleryItems) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <GalleryDisplay
      mainPhoto={mainPhoto}
      mainPhotoBlurUrl={mainPhotoBlurUrl}
      galleryItems={sortedGalleryItems}
    />
  );
}
