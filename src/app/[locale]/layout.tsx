import "@fontsource/arimo";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/header";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata() {
  return {
    title: "Lali Solari",
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
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <section className={`min-h-screen ${inter.className}`}>
            <Header />
            <main>{children}</main>
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
