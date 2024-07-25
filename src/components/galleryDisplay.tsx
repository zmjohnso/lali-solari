"use client";

import { useState } from "react";
import { GalleryItem } from "../../lib/types";
import { usePhotoLoader } from "../hooks/usePhotoLoader";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Gallery from "./gallery";
import { useRouter } from "../navigation";

export interface GalleryDisplayPageProps {
  mainPhoto: GalleryItem | undefined;
  galleryItems: GalleryItem[];
}

export default function GalleryDisplay({
  mainPhoto,
  galleryItems,
}: GalleryDisplayPageProps) {
  const router = useRouter();
  const { imageLoaded } = usePhotoLoader(mainPhoto?.photo);
  const [currentIndex, setCurrentIndex] = useState(
    galleryItems.findIndex(
      (item) => item.thumbnail.sys.id === mainPhoto?.thumbnail.sys.id
    )
  );

  const collectionName = mainPhoto?.gallery.name;
  const collectionDescription = mainPhoto?.gallery.description;
  const mainPhotoUrl = mainPhoto?.photo.url;
  const mainPhotoTitle = mainPhoto?.photo.title;
  const mainPhotoPaintingData = mainPhoto?.paintingData;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      router.push(
        `/gallery/${galleryItems[currentIndex - 1].thumbnail.sys.id}`
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      router.push(
        `/gallery/${galleryItems[currentIndex + 1].thumbnail.sys.id}`
      );
    }
  };

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="mb-20">
        <h3 className="font-bold mb-16 text-[clamp(1rem, 10vw, 3rem)] font-open-sans">
          {collectionName}
        </h3>
        <p className="text-center mb-12 w-88 md:w-120 font-arimo">
          {collectionDescription}
        </p>
        <div className="flex items-center mb-12 space-x-4">
          <button
            aria-label="main display photo back arrow"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            &#8592;
          </button>
          <div className="relative w-full">
            {imageLoaded ? (
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    className="w-full h-auto"
                    src={mainPhotoUrl ?? ""}
                    alt={mainPhotoTitle ?? ""}
                    loading="lazy"
                    width={2000}
                    height={500}
                  />
                </TransformComponent>
              </TransformWrapper>
            ) : (
              <div className="w-full h-auto bg-gray-200 animate-pulse pt-[75%]" />
            )}
            {mainPhotoPaintingData && (
              <span className="text-xs flex justify-end mt-2 pr-4 font-arimo">
                {mainPhotoPaintingData.size} {mainPhotoPaintingData.technique}
              </span>
            )}
          </div>
          <button
            aria-label="main display photo forward arrow"
            onClick={handleNext}
            disabled={currentIndex >= galleryItems.length - 1}
            className={`p-2 ${currentIndex >= galleryItems.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            &#8594;
          </button>
        </div>
        <Gallery
          key={mainPhoto?.thumbnail.sys.id}
          mainPhoto={mainPhoto}
          galleryItems={galleryItems}
        />
      </div>
    </div>
  );
}
