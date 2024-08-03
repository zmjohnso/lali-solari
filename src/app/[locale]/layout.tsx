import { Arimo, Bebas_Neue, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/header";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/src/config";

const arimo = Arimo({ subsets: ["latin"], variable: "--font-arimo" });
const bebassNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const bison = localFont({
  src: "../../fonts/Bison-Bold.ttf",
  display: "swap",
  variable: "--font-bison",
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<LocaleLayoutProps, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
}

// Layout is a Server Component by default
// See https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#client-components
// for future optimization of the Header component (pull out interactive parts into a client component)
// and leave the static elements (i.e. the logo) in the server component

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<LocaleLayoutProps>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${arimo.variable} ${bebassNeue.variable} ${openSans.variable} ${bison.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <section className="min-h-screen">
            <Header />
            {children}
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
