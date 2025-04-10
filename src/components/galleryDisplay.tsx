"use client";

import { Suspense, useState } from "react";
import { GalleryItem } from "../../lib/types";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import BackButton from "./backButton";
import dynamic from "next/dynamic";
import { useRouter } from "../i18n/navigation";

const Gallery = dynamic(() => import("./gallery"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export interface GalleryDisplayPageProps {
  mainPhoto: GalleryItem;
  mainPhotoBlurUrl: string;
  galleryItems: GalleryItem[];
}

export default function GalleryDisplay({
  mainPhoto,
  mainPhotoBlurUrl,
  galleryItems,
}: GalleryDisplayPageProps) {
  const t = useTranslations("Home");
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(
    galleryItems.findIndex(
      (item) => item.thumbnail.sys.id === mainPhoto.thumbnail.sys.id
    )
  );

  const collectionName = mainPhoto.gallery.name;
  const collectionDescription = mainPhoto.gallery.description;
  const mainPhotoUrl = mainPhoto.photo.url;
  const mainPhotoTitle = mainPhoto.photo.title;
  const mainPhotoPaintingData = mainPhoto.paintingData;

  const mainPhotoWidth = 1920;
  const mainPhotoHeight = 1080;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      router.push(
        {
          pathname: "/gallery/[id]",
          params: { id: galleryItems[currentIndex - 1].thumbnail.sys.id },
        },
        { scroll: false }
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < galleryItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      router.push(
        {
          pathname: "/gallery/[id]",
          params: { id: galleryItems[currentIndex + 1].thumbnail.sys.id },
        },
        { scroll: false }
      );
    }
  };

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="mb-20">
        <h3 className="mb-8 font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans">
          {collectionName}
        </h3>
        <p className="flex self-center mb-8 w-80 md:w-7/12 ml-4 md:ml-52 font-arimo">
          {collectionDescription}
        </p>
        <div className="flex items-center mb-12">
          <button
            aria-label="main display photo back arrow"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={clsx("p-2", {
              "opacity-50 cursor-not-allowed": currentIndex === 0,
              "rounded-full hover:bg-gray-100": currentIndex !== 0,
            })}
          >
            &#8592;
          </button>
          <div className="w-full">
            <div className="w-full h-auto">
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    src={mainPhotoUrl ?? ""}
                    alt={mainPhotoTitle ?? ""}
                    width={mainPhotoWidth}
                    height={mainPhotoHeight}
                    placeholder="blur"
                    blurDataURL={mainPhotoBlurUrl}
                    priority
                    loading="eager"
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
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
            className={clsx("p-2", {
              "opacity-50 cursor-not-allowed":
                currentIndex >= galleryItems.length - 1,
              "rounded-full hover:bg-gray-100":
                currentIndex < galleryItems.length - 1,
            })}
          >
            &#8594;
          </button>
        </div>
        <Suspense fallback={<div>Loading gallery...</div>}>
          <Gallery
            key={mainPhoto.thumbnail.sys.id}
            mainPhoto={mainPhoto}
            galleryItems={galleryItems}
          />
        </Suspense>
        <BackButton />
      </div>
    </div>
  );
}
