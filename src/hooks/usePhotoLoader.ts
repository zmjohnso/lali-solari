"use client";

import { MinimumPhoto, PhotoWithId } from "@/lib/types";
import { useState, useEffect } from "react";

export const usePhotoLoader = (
  photo: PhotoWithId | MinimumPhoto | undefined
) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (photo && photo.url) {
      const img = new Image();
      img.src = photo.url;
      img.onload = () => setImageLoaded(true);
    }
  }, [photo]);

  return { imageLoaded };
};
