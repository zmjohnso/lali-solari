import { getGalleryDisplayPageData } from "@/lib/api";
import GalleryDisplay from "@/src/components/galleryDisplay";
import getBase64 from "@/src/shared/getBase64";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const galleryDisplayPage = await getGalleryDisplayPageData(
    getContentfulLocale(params.locale)
  );
  const mainPhoto = galleryDisplayPage.find(
    (item) => item.thumbnail.sys.id === params.id
  );
  const galleryItems = galleryDisplayPage.filter(
    (item) => item.gallery.name === mainPhoto?.gallery.name
  );
  const sortedGalleryItems = galleryItems.sort(
    (a, b) => extractPhotoId(a.title) - extractPhotoId(b.title)
  );

  const mainPhotoBlurUrl = mainPhoto?.photo.url
    ? await getBase64(mainPhoto.photo.url)
    : undefined;

  // const galleryItemsBlurUrls = await getBase64Images(sortedGalleryItems);

  // copy the blurUrl into the sortedGalleryItems
  // sortedGalleryItems.forEach(
  //   (item, i) => (item.thumbnail.blurUrl = galleryItemsBlurUrls[i].blurUrl)
  // );

  return (
    <GalleryDisplay
      mainPhoto={mainPhoto}
      mainPhotoBlurUrl={mainPhotoBlurUrl}
      galleryItems={sortedGalleryItems}
    />
  );
}
