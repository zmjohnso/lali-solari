export type ContentfulLocale = "en-US" | "es";
export interface PhotoWithId {
  sys: {
    id: string;
  };
  title: string;
  url: string;
  blurUrl?: string;
}

export interface MinimumPhoto {
  title: string;
  url: string;
}

export interface MinimumHomePage {
  title: string;
  thumbnail: PhotoWithId;
}

export interface HomePage {
  title: string;
  thumbnail: PhotoWithId;
  base64: string | undefined;
}

export interface MinimumHomePageCollection {
  items: MinimumHomePage[];
}

export interface MinimumHomePageResponse {
  data: {
    minimumHomePageCollection: MinimumHomePageCollection;
  };
}

export interface GalleryItem {
  title: string;
  photo: MinimumPhoto;
  thumbnail: PhotoWithId;
  gallery: {
    name: string;
    description: string;
  };
  paintingData: {
    size: string;
    technique: string;
  };
}

export interface GalleryItemCollection {
  items: GalleryItem[];
}

export interface GalleryItemResponse {
  data: {
    galleryPhotoCollection: GalleryItemCollection;
  };
}

export interface AboutPageResponse {
  data: {
    aboutCollection: AboutPageCollection;
  };
}

export interface AboutPageCollection {
  items: AboutPage[];
}

export interface AboutPage {
  title: string;
  titlePhoto: MinimumPhoto;
  description: string;
  mediaCollection: {
    items: MinimumPhoto[];
  };
}

export interface ManifestoPageResponse {
  data: {
    manifiestoCollection: ManifestoPageCollection;
  };
}

export interface ManifestoPageCollection {
  items: ManifestoPage[];
}

export interface ManifestoPage {
  title: string;
  description: string;
  media: MinimumPhoto;
}
