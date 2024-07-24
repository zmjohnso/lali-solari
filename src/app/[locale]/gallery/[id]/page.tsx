import { getGalleryDisplayPageData } from "@/lib/api";
import { Locale } from "@/src/app/shared/types";
import GalleryDisplay from "@/src/components/galleryDisplay";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const i18nLocale: Locale = params.locale === "en" ? "en-US" : "es";
  const galleryDisplayPage = await getGalleryDisplayPageData(i18nLocale);
  const mainPhoto = galleryDisplayPage.find(
    (item) => item.thumbnail.sys.id === params.id
  );
  const galleryItems = galleryDisplayPage.filter(
    (item) => item.gallery.name === mainPhoto?.gallery.name
  );

  return <GalleryDisplay mainPhoto={mainPhoto} galleryItems={galleryItems} />;
}
