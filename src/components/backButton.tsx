import { useTranslations } from "next-intl";
import { Link } from "../navigation";

export default function BackButton() {
  const t = useTranslations("Home");

  return (
    <Link href="/">
      <h3 className="flex justify-end pt-8 pr-8 font-bison font-bold italic text-7xl">
        {t("back")}
      </h3>
    </Link>
  );
}
