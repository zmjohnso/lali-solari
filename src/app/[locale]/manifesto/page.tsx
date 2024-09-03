import { getManifestoPageData } from "@/lib/api";
import BackButton from "@/src/components/backButton";
import getBase64 from "@/src/shared/getBase64";
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

  const base64 = await getBase64(manifestoPage.media.url);

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="flex flex-col mb-20">
        <h3 className="mb-8 font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
          {manifestoPage.title}
        </h3>
        <Image
          className="mb-8"
          src={manifestoPage.media.url}
          alt={manifestoPage.media.title}
          width={4032}
          height={2268}
          placeholder="blur"
          blurDataURL={base64}
          priority
        />
        <p className="flex self-center mb-8 w-80 md:w-7/12 font-arimo">
          {manifestoPage.description}
        </p>
        <BackButton />
      </div>
    </div>
  );
}
