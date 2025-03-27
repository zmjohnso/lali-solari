"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { MdTranslate } from "@react-icons/all-files/md/MdTranslate";
import clsx from "clsx";
import { usePathname, useRouter } from "../i18n/navigation";
import { useParams } from "next/navigation";

export default function LanguageDropdown() {
  const router = useRouter();
  const params = useParams();
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
      // Handle dynamic routes differently
      if (pathname.startsWith("/gallery/")) {
        router.replace(
          {
            pathname: "/gallery/[id]",
            params: { id: params.id as string },
          },
          { locale: newRouteLanguage }
        );
      } else {
        // Handle static routes
        router.replace(
          {
            pathname: pathname as
              | "/"
              | "/about"
              | "/contact"
              | "/exclusive-designs"
              | "/manifesto",
          },
          { locale: newRouteLanguage }
        );
      }
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
        aria-label="language dropdown button"
      >
        <MdTranslate size={23} />
      </button>

      <div
        id="dropdownMenu"
        className={clsx(
          "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50",
          {
            block: isOpen,
            hidden: !isOpen,
          }
        )}
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
