"use client";

import { PhotoWithId } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "../navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface PhotoGridItemProps {
  thumbnail: PhotoWithId;
  base64: string | undefined;
}

export default function PhotoGridItem({
  thumbnail,
  base64,
}: PhotoGridItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    startTransition(() => {
      router.push(`/gallery/${thumbnail.sys.id}`);
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
          loading="lazy"
          className={clsx(
            "max-w-full block max-h-full transition-transform duration-300 flex-shrink-0 hover:scale-105",
            {
              "opacity-50": isLoading || isPending,
            }
          )}
          placeholder="blur"
          blurDataURL={base64}
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
