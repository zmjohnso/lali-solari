import { unstable_setRequestLocale } from "next-intl/server";

export default function ExclusiveDesigns({
  params,
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  return (
    <div className="w-screen text-center">
      <h3
        className="font-bold text-[clamp(1rem,10vw,3rem)] font-open-sans mt-8"
        lang="en"
      >
        EXCLUSIVE DESIGNS
      </h3>
      <h5
        className="text-[clamp(1rem,10vw,3rem)] font-arimo mt-[3.75rem]"
        lang="en"
      >
        Coming Soon
      </h5>
    </div>
  );
}
