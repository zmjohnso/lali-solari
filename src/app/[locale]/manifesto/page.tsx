import { getManifestoPageData } from "@/lib/api";
import { getContentfulLocale } from "@/src/shared/utilities";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function Manifesto({
  params,
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const manifestoPage = await getManifestoPageData(
    getContentfulLocale(params.locale)
  );

  if (!manifestoPage) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="mb-20">
        <h3 className="mb-8 font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
          {manifestoPage.title}
        </h3>
        <p className="flex self-center mb-8 w-80 md:w-7/12 ml-4 md:ml-52 font-arimo">
          {manifestoPage.description}
        </p>
        <Image
          src={manifestoPage.media.url}
          alt={manifestoPage.media.title}
          width={4032}
          height={2268}
          priority
        />
      </div>
    </div>
  );
}
