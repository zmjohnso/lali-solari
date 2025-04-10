import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function ExclusiveDesigns(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = use(props.params);
  // Enable static rendering
  setRequestLocale(params.locale);

  const t = useTranslations("ExclusiveDesigns");

  return (
    <div className="w-screen text-center">
      <h3 className="uppercase text-[clamp(1rem,10vw,3rem)] font-open-sans mt-8">
        {t("title")}
      </h3>
      <h5 className="text-[clamp(1rem,10vw,3rem)] font-arimo mt-[3.75rem]">
        {t("description")}
      </h5>
    </div>
  );
}
