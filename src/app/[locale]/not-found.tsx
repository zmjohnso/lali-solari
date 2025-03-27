import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">{t("description")}</p>
      <Link
        href="/"
        className="px-4 py-2 text-lg text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {t("back")}
      </Link>
    </div>
  );
}
