"use client";

import { useEffect, useState } from "react";
import { extractPhotoId } from "../shared/utilities";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import clsx from "clsx";
import { Link } from "../i18n/navigation";

export interface GalleryProps {
  mainPhoto: GalleryItem | undefined;
  galleryItems: GalleryItem[];
}

export default function Gallery({ mainPhoto, galleryItems }: GalleryProps) {
  const itemsToShow = 5;

  const photoId = extractPhotoId(mainPhoto?.title || "");
  const initialIndex = Math.floor(photoId / itemsToShow) * itemsToShow;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const newPhotoId = extractPhotoId(mainPhoto?.title || "");
    setCurrentIndex(Math.floor(newPhotoId / itemsToShow) * itemsToShow);
  }, [mainPhoto, itemsToShow]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < galleryItems.length - itemsToShow ? prevIndex + 1 : prevIndex
    );
  };

  const visibleImages = galleryItems.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <div className="flex items-center">
      {galleryItems.length > itemsToShow && (
        <button
          aria-label="gallery photo back arrow"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={clsx("p-2", {
            "opacity-50 cursor-not-allowed": currentIndex === 0,
            "rounded-full hover:bg-gray-100": currentIndex !== 0,
          })}
        >
          &#8592;
        </button>
      )}
      <div className="flex-grow">
        <div className="grid grid-cols-5 gap-2">
          {visibleImages.map((item) => (
            <div key={item.thumbnail.title} className="flex items-center">
              <Link
                href={{
                  pathname: "/gallery/[id]",
                  params: { id: item.thumbnail.sys.id },
                }}
                scroll={false}
              >
                <Image
                  src={item.thumbnail.url}
                  alt={item.thumbnail.title}
                  className="w-full transition-transform duration-300 hover:scale-105"
                  width={2025}
                  height={2025}
                  // placeholder="blur"
                  // blurDataURL={item.thumbnail.blurUrl}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {galleryItems.length > itemsToShow && (
        <button
          aria-label="gallery photo forward arrow"
          onClick={handleNext}
          disabled={currentIndex >= galleryItems.length - itemsToShow}
          className={clsx("p-2", {
            "opacity-50 cursor-not-allowed":
              currentIndex >= galleryItems.length - itemsToShow,
            "rounded-full hover:bg-gray-100":
              currentIndex < galleryItems.length - itemsToShow,
          })}
        >
          &#8594;
        </button>
      )}
    </div>
  );
}
