"use client";

import { useState } from "react";
import { GalleryItem } from "../../lib/types";
import { usePhotoLoader } from "../hooks/usePhotoLoader";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Gallery from "./gallery";
import { useRouter } from "../navigation";
import { useTranslations } from "next-intl";

export interface GalleryDisplayPageProps {
  mainPhoto: GalleryItem | undefined;
  galleryItems: GalleryItem[];
}

export default function GalleryDisplay({
  mainPhoto,
  galleryItems,
}: GalleryDisplayPageProps) {
  const t = useTranslations("Home");
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

  let mainPhotoWidth = 1280;
  let mainPhotoHeight = 1250;
  switch (collectionName?.toLowerCase()) {
    case t("abstractReverberations").toLowerCase():
      mainPhotoWidth = 1280;
      mainPhotoHeight = 860;
      break;
    case t("roots").toLowerCase():
      mainPhotoWidth = 3100;
      mainPhotoHeight = 3100;
      break;
    case t("symbiosis").toLowerCase():
      mainPhotoWidth = 1280;
      mainPhotoHeight = 1275;
      break;
    case t("pandemic").toLowerCase():
      mainPhotoWidth = 1280;
      mainPhotoHeight = 1250;
      break;
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      router.push(
        `/gallery/${galleryItems[currentIndex - 1].thumbnail.sys.id}`,
        { scroll: false }
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      router.push(
        `/gallery/${galleryItems[currentIndex + 1].thumbnail.sys.id}`,
        { scroll: false }
      );
    }
  };

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="mb-20">
        <h3 className="font-bold mb-8 text-[clamp(1rem,10vw,3rem)] font-open-sans">
          {collectionName}
        </h3>
        <p className="flex self-center mb-8 w-80 md:w-2/4 ml-10 md:ml-52 font-arimo">
          {collectionDescription}
        </p>
        <div className="flex items-center mb-12">
          <button
            aria-label="main display photo back arrow"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "rounded-full hover:bg-gray-100"}`}
          >
            &#8592;
          </button>
          <div className="w-full">
            {imageLoaded ? (
              <div className="w-full h-auto">
                <TransformWrapper>
                  <TransformComponent>
                    <Image
                      src={mainPhotoUrl ?? ""}
                      alt={mainPhotoTitle ?? ""}
                      width={mainPhotoWidth}
                      height={mainPhotoHeight}
                      priority
                      className={`${imageLoaded ? "block" : "hidden"}`}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
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
            className={`p-2 ${currentIndex >= galleryItems.length - 1 ? "opacity-50 cursor-not-allowed" : "rounded-full hover:bg-gray-100"}`}
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
