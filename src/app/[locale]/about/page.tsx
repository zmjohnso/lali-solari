import { getAboutPageData } from "@/lib/api";
import { Locale } from "../../shared/types";
import Image from "next/image";

export default async function About({
  params,
}: {
  params: { locale: string };
}) {
  const i18nLocale: Locale = params.locale === "en" ? "en-US" : "es";
  const aboutPage = await getAboutPageData(i18nLocale);

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <h3 className="font-bold mb-4 text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
        {aboutPage.title}
      </h3>

      <div className="w-[22rem] md:w-[50rem] mb-3 md:pl-56 font-arimo">
        {aboutPage.description}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {aboutPage.mediaCollection.items.map((item) => (
          <div key={item.title} className="overflow-hidden">
            <Image
              src={item.url}
              alt={item.title}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
