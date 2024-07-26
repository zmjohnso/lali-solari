"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { MdTranslate } from "@react-icons/all-files/md/MdTranslate";
import { usePathname, useRouter } from "../navigation";

export default function LanguageDropdown() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageMode = (currentLanguage: string) => {
    const newRouteLanguage = currentLanguage === "English" ? "en" : "es";
    startTransition(() => {
      router.replace(pathname, { locale: newRouteLanguage });
    });
  };

  const languageOptions = ["English", "castellano"];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        type="button"
        className="p-2 rounded-full bg-white text-gray-500 hover:bg-gray-100"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdownMenu"
      >
        <MdTranslate size={23} />
      </button>

      <div
        id="dropdownMenu"
        className={`${isOpen ? "block" : "hidden"} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownButton"
        >
          {languageOptions.map((lang) => (
            <button
              key={lang}
              disabled={isPending}
              onClick={() => {
                handleToggle();
                handleLanguageMode(lang);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
