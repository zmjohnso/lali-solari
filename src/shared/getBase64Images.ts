import { GalleryItem, MinimumPhoto, PhotoWithId } from "@/lib/types";
import getBase64 from "./getBase64";

export default async function getBase64Images(
  images: GalleryItem[]
): Promise<PhotoWithId[]> {
  const base64Promises = images.map((photo) => getBase64(photo.thumbnail.url));

  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur: PhotoWithId[] = images.map((photo, i) => {
    return {
      sys: {
        id: photo.thumbnail.sys.id,
      },
      title: photo.thumbnail.title,
      url: photo.thumbnail.url,
      blurUrl: base64Results[i],
    };
  });

  return photosWithBlur;
}
