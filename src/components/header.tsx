"use client";

import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { usePathname } from "next/navigation";
import LanguageDropdown from "./languageDropdown";
import { Link } from "../navigation";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/en" || pathname === "/es";

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/lalisolariart/",
      "_blank",
      "noopener noreferrer"
    );
  };

  return (
    <header className="flex flex-col bg-transparent shadow-none py-2">
      <div className="flex justify-between items-center">
        {isHomePage && <div>{/* empty div for spacing */}</div>}
        <div
          className={`flex flex-col items-center cursor-pointer ${isHomePage ? "pl-20" : "pl-0"}`}
        >
          <Link href="/">
            <h4
              className="font-bold font-bison"
              style={{
                fontSize: isHomePage
                  ? "clamp(2rem, 6vw, 10rem)"
                  : "clamp(1rem, 6vw, 4rem)",
              }}
            >
              LALI SOLARI
            </h4>
          </Link>
          <Link href="/">
            <p
              className="font-open-sans"
              style={{
                fontSize: "clamp(0.5rem, 1.25vw, 6rem)",
              }}
              lang="en"
            >
              FINE ARTS & EXCLUSIVE DESIGNS
            </p>
          </Link>
        </div>
        <div className="flex flex-row sm:pr-0 md:pr-2">
          <LanguageDropdown />
          <button
            aria-label="instagram link button"
            onClick={handleInstagramClick}
            className="rounded-full hover:border-gray-300 pr-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FaInstagram size={23} />
          </button>
        </div>
      </div>
    </header>
  );
}
