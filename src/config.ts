import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "es"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/about": {
    en: "/about",
    es: "/about",
  },
  "/manifesto": {
    en: "/manifesto",
    es: "/manifiesto",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

// TODO: update these env variables
export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
