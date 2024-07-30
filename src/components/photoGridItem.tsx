// "use client";

import { PhotoWithId } from "@/lib/types";
import Image from "next/image";
// import { usePhotoLoader } from "../hooks/usePhotoLoader";
import { Link } from "../navigation";

interface PhotoGridItemProps {
  thumbnail: PhotoWithId;
}

export default function PhotoGridItem({ thumbnail }: PhotoGridItemProps) {
  // const { imageLoaded } = usePhotoLoader(thumbnail);
  const photoUrl = thumbnail.url;
  const photoTitle = thumbnail.title;

  return (
    <div className="flex items-center justify-center">
      {/* {imageLoaded ? ( */}
      <Link href={`/gallery/${thumbnail.sys.id}`}>
        <Image
          src={photoUrl}
          alt={photoTitle}
          loading="lazy"
          className={`max-w-full block max-h-full transition-transform duration-300 flex-shrink-0 hover:scale-105`}
          // className={`max-w-full ${imageLoaded ? "block" : "hidden"} max-h-full transition-transform duration-300 flex-shrink-0 hover:scale-105`}
          // all thumbnails in Contentful are 2025x2025
          // this is needed for the prerendering, then it will be responsive by default
          width={2025}
          height={2025}
        />
      </Link>
      {/* ) : (
        <div className="w-full h-auto pt-[75%] bg-gray-200 animate-pulse"></div>
      )} */}
    </div>
  );
}
