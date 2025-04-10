import { getAboutPageData } from "@/lib/api";
import Image from "next/image";
import { getContentfulLocale } from "@/src/shared/utilities";
import BackButton from "@/src/components/backButton";
import { setRequestLocale } from "next-intl/server";

export default async function About(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  // Enable static rendering
  setRequestLocale(params.locale);

  const aboutPage = await getAboutPageData(getContentfulLocale(params.locale));

  if (!aboutPage) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <div className="flex flex-col mb-20">
        <h3 className="mb-8 font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
          {aboutPage.title}
        </h3>
        <Image
          className="mb-8"
          src={aboutPage.titlePhoto.url}
          alt={aboutPage.titlePhoto.title}
          width={3024}
          height={3781}
          placeholder="blur"
          blurDataURL={aboutPage.titlePhoto.lowQualityUrl}
          priority
        />
        <p className="flex self-center mb-8 w-80 md:w-7/12 font-arimo">
          {aboutPage.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {aboutPage.mediaCollection.items.map((item) => (
            <div key={item.title} className="overflow-hidden">
              <Image
                src={item.url}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <BackButton />
      </div>
    </div>
  );
}
