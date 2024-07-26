"use client";

import { PhotoWithId } from "@/lib/types";
import Image from "next/image";
import { usePhotoLoader } from "../hooks/usePhotoLoader";
import { Link } from "../navigation";

interface PhotoGridItemProps {
  thumbnail: PhotoWithId;
}

export default function PhotoGridItem({ thumbnail }: PhotoGridItemProps) {
  const { imageLoaded } = usePhotoLoader(thumbnail);
  const photoUrl = thumbnail.url;
  const photoTitle = thumbnail.title;

  return (
    <div className="flex items-center justify-center">
      {imageLoaded ? (
        <Link href={`gallery/${thumbnail.sys.id}`}>
          <Image
            src={photoUrl}
            alt={photoTitle}
            loading="lazy"
            className={`max-w-full ${imageLoaded ? "block" : "hidden"} max-h-full transition-transform duration-300 flex-shrink-0 hover:scale-105`}
            // the width and height props are required for the image to display
            // but the width just needs to be large enough to fill the screen
            // then in will be responsive by default
            width={500}
            height={300}
          />
        </Link>
      ) : (
        <div className="w-full h-auto pt-[75%] bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
}
