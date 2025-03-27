"use client";

import clsx from "clsx";
import { Link, usePathname } from "../i18n/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      {isHomePage && <div>{/* empty div for spacing */}</div>}
      <div
        className={clsx("flex flex-col items-center", {
          "pl-20": isHomePage,
          "pl-4": !isHomePage,
        })}
      >
        <Link href="/" prefetch>
          <h4 className="font-bold font-bison text-[clamp(2rem,6vw,10rem)]">
            LALI SOLARI
          </h4>
        </Link>
        <Link href="/" prefetch>
          <p
            className="font-open-sans text-[clamp(0.4rem,1.25vw,6rem)]"
            lang="en"
          >
            FINE ARTS & EXCLUSIVE DESIGNS
          </p>
        </Link>
      </div>
    </>
  );
}
