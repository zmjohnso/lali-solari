import { getManifestoPageData } from "@/lib/api";
import { getContentfulLocale } from "@/src/shared/utilities";
import { unstable_setRequestLocale } from "next-intl/server";

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
      <h3 className="mb-4 font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans uppercase">
        {manifestoPage.title}
      </h3>
      <div className="w-[22rem] md:w-[50rem] mb-3 md:pl-56 font-arimo">
        {manifestoPage.description}
      </div>
    </div>
  );
}
