"use client";

import clsx from "clsx";
import { Link, usePathname } from "../navigation";

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
        <Link href="/">
          <h4
            className={clsx("font-bold font-bison", {
              "text-[clamp(2rem,6vw,10rem)]": isHomePage,
              "text-[clamp(1rem,6vw,4rem)]": !isHomePage,
            })}
          >
            LALI SOLARI
          </h4>
        </Link>
        <Link href="/">
          <p
            className="font-open-sans text-[clamp(0.5rem,1.25vw,6rem)]"
            lang="en"
          >
            FINE ARTS & EXCLUSIVE DESIGNS
          </p>
        </Link>
      </div>
    </>
  );
}
