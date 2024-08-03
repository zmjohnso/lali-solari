"use client";

import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import LanguageDropdown from "./languageDropdown";
import { Link, usePathname } from "../navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="flex flex-col bg-transparent shadow-none py-2">
      <div
        className={clsx("flex justify-between items-center", {
          "pl-4": !isHomePage,
          "pl-0": isHomePage,
        })}
      >
        {isHomePage && <div>{/* empty div for spacing */}</div>}
        <div
          className={clsx("flex flex-col items-center", {
            "pl-20": isHomePage,
            "pl-0": !isHomePage,
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
        <div className="flex flex-row pr-2 md:pr-4">
          <LanguageDropdown />
          <a
            href="https://www.instagram.com/lalisolariart/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              aria-label="instagram link button"
              className="p-2 rounded-full bg-white text-gray-500 hover:bg-gray-100"
            >
              <FaInstagram size={23} />
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
