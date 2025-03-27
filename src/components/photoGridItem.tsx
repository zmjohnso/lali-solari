"use client";

import { PhotoWithId } from "@/lib/types";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "../i18n/navigation";

interface PhotoGridItemProps {
  thumbnail: PhotoWithId;
}

export default function PhotoGridItem({ thumbnail }: PhotoGridItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    startTransition(() => {
      router.push({
        pathname: "/gallery/[id]",
        params: { id: thumbnail.sys.id },
      });
    });
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleClick}
        className="w-full h-full"
        disabled={isLoading || isPending}
      >
        <Image
          src={thumbnail.url}
          alt={thumbnail.title}
          // loading="lazy"
          className={clsx(
            "max-w-full block max-h-full transition-transform duration-300 flex-shrink-0 hover:scale-105",
            {
              "opacity-50": isLoading || isPending,
            }
          )}
          placeholder="blur"
          blurDataURL={thumbnail.lowQualityUrl}
          width={2025}
          height={2025}
        />
        {(isLoading || isPending) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
