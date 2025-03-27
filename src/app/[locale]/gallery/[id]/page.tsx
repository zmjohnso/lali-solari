import { cache } from "react";
import { getGalleryDisplayPageData } from "@/lib/api";
import GalleryDisplay from "@/src/components/galleryDisplay";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";
import { ContentfulLocale } from "@/lib/types";
import { setRequestLocale } from "next-intl/server";

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

export default async function Page(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);

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

  const mainPhotoBlurUrl = mainPhoto?.photo.lowQualityUrl;

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
