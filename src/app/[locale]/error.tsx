"use client";

import { useTranslations } from "next-intl";
import { MdErrorOutline } from "@react-icons/all-files/md/MdErrorOutline";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto mt-16 text-center">
      <div className="flex flex-col items-center justify-center mb-8">
        <MdErrorOutline className="w-20 h-20 text-red-600 mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-bison">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl mb-4 font-open-sans">{t("body")}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={reset}
        >
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
