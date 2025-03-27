import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      es: "/about",
    },
    "/contact": {
      en: "/contact",
      es: "/contact",
    },
    "/exclusive-designs": {
      en: "/exclusive-designs",
      es: "/exclusive-designs",
    },
    "/manifesto": {
      en: "/manifesto",
      es: "/manifiesto",
    },
    "/gallery/[id]": {
      en: "/gallery/[id]",
      es: "/gallery/[id]",
    },
  },
} as const); // The magic fix - 'as const' assertion
