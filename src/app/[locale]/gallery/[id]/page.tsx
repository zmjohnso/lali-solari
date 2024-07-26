import { getGalleryDisplayPageData } from "@/lib/api";
import GalleryDisplay from "@/src/components/galleryDisplay";
import { extractPhotoId, getContentfulLocale } from "@/src/shared/utilities";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
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

  return (
    <GalleryDisplay mainPhoto={mainPhoto} galleryItems={sortedGalleryItems} />
  );
}
