import { getManifestoPageData } from "@/lib/api";
import { Locale } from "../../shared/types";

export default async function Manifesto({
  params,
}: {
  params: { locale: string };
}) {
  const i18nLocale: Locale = params.locale === "en" ? "en-US" : "es";
  const manifestoPage = await getManifestoPageData(i18nLocale);

  return (
    <div className="px-4 md:px-40 pt-2 md:pt-20">
      <h3 className="font-bold mb-4 text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
        {manifestoPage.title}
      </h3>
      <div className="w-[22rem] md:w-[50rem] mb-3 md:pl-56 font-arimo">
        {manifestoPage.description}
      </div>
    </div>
  );
}
