import "@fontsource/arimo";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/header";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/src/config";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className}`}>
        <NextIntlClientProvider messages={messages}>
          <section className={`min-h-screen`}>
            <Header />
            <main>{children}</main>
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
