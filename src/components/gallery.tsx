"use client";

import { useEffect, useState } from "react";
import { extractPhotoId } from "../shared/utilities";
import { GalleryDisplayPageProps } from "./galleryDisplay";
import Image from "next/image";
import Link from "next/link";

export default function Gallery({
  mainPhoto,
  galleryItems,
}: GalleryDisplayPageProps) {
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
          className={`p-2 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          &#8592;
        </button>
      )}
      <div className="flex-grow">
        <div className="grid grid-cols-5 gap-2">
          {visibleImages.map((item) => (
            <div key={item.thumbnail.title} className="flex items-center">
              <Link href={`/gallery/${item.thumbnail.sys.id}`}>
                <Image
                  src={item.thumbnail.url}
                  alt={item.thumbnail.title}
                  className="w-full transition-transform duration-300 hover:scale-105"
                  width={150}
                  height={150}
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
          className={`p-2 ${currentIndex >= galleryItems.length - itemsToShow ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          &#8594;
        </button>
      )}
    </div>
  );
}
