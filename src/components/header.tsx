"use client";

import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import LanguageDropdown from "./languageDropdown";
import { Link, usePathname } from "../navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="flex flex-col bg-transparent shadow-none py-2">
      <div className="flex justify-between items-center">
        {isHomePage && <div>{/* empty div for spacing */}</div>}
        <div
          className={`flex flex-col items-center ${isHomePage ? "pl-20" : "pl-0"}`}
        >
          <Link href="/">
            <h4
              className={`font-bold tracking-tight font-bison pl-6 ${isHomePage ? "text-[clamp(1rem,6vw,10rem)]" : "text-[clamp(1rem,6vw,2.5rem)]"}`}
            >
              LALI SOLARI
            </h4>
          </Link>
          <Link href="/">
            <p
              className="font-open-sans pl-4 text-[clamp(0.65rem,1.25vw,6rem)]"
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
