import { useTranslations } from "next-intl";
import { extractTitle } from "@/src/shared/utilities";
import { MinimumHomePage } from "@/lib/types";
import { PhotoGridItem } from "./photoGridItem";
import Link from "next/link";

interface HomePageProps {
  homePage: MinimumHomePage[];
}

export default function Home({ homePage }: HomePageProps) {
  // const homePage = await getMinimumHomePageData();
  const t = useTranslations("Home"); // not callable within an async function

  const arPhotos = homePage.filter(
    (x) => extractTitle(x.title) === t("abstractReverberations")
  );
  const symbiosisPhotos = homePage.filter(
    (x) => extractTitle(x.title) === t("symbiosis")
  );
  const pandemicPhotos = homePage.filter(
    (x) => extractTitle(x.title) === t("pandemic")
  );
  const rootsPhotos = homePage.filter(
    (x) => extractTitle(x.title) === t("roots")
  );

  const abstractReverberationsName =
    arPhotos[0] && extractTitle(arPhotos[0].title);
  const symbiosisName =
    symbiosisPhotos[0] && extractTitle(symbiosisPhotos[0].title);
  const pandemicName =
    pandemicPhotos[0] && extractTitle(pandemicPhotos[0].title);
  const rootsName = rootsPhotos[0] && extractTitle(rootsPhotos[0].title);

  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-8 mb-4">
      <Link href="/manifesto">
        <h1 className="font-bold font-bebas uppercase text-[clamp(2rem,18vw,20rem)] hover:text-neon-green ml-12 md:ml-32">
          {t("manifesto")}
        </h1>
      </Link>
      <Link href="/about">
        <h1
          className="font-bold font-bebas text-[clamp(2rem,16vw,18rem)] hover:text-neon-green cursor-pointer"
          lang="en"
        >
          ABOUT
        </h1>
      </Link>
      <a
        href="https://www.etsy.com/es/shop/Lalisolariart"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2
          className="font-bold font-bison italic text-[clamp(2rem,16vw,18rem)] hover:text-neon-green cursor-pointer"
          lang="en"
        >
          GALLERY
        </h2>
      </a>
      <Link href="/contact">
        <h2
          className="font-bold font-bebas text-[clamp(2rem,11vw,18rem)] hover:text-neon-green cursor-pointer mr-8 md:mr-16"
          lang="en"
        >
          CONTACT
        </h2>
      </Link>
      <Link href="/exclusive-designs">
        <h2
          className="font-bold font-bison italic text-[clamp(0.5rem,6vw,8rem)] hover:text-neon-green cursor-pointer ml-32 md:ml-84"
          lang="en"
        >
          EXCLUSIVE DESIGNS
        </h2>
      </Link>
      <Link href={`/gallery/${arPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas text-[clamp(2rem,6vw,10rem)] mb-1">
          {abstractReverberationsName}
        </h2>
      </Link>
      <div className="grid grid-cols-5 gap-2">
        {arPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`gallery/${rootsPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas text-[clamp(2rem,6vw,10rem)] mt-6 mb-2">
          {rootsName}
        </h2>
      </Link>
      <div className="grid grid-cols-3 gap-2">
        {rootsPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`gallery/${symbiosisPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas text-[clamp(2rem,6vw,10rem)] mt-6 mb-2">
          {symbiosisName}
        </h2>
      </Link>
      <div className="grid grid-cols-4 gap-2">
        {symbiosisPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`gallery/${pandemicPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas text-[clamp(2rem,6vw,10rem)] mt-6 mb-2">
          {pandemicName}
        </h2>
      </Link>
      <div className="grid grid-cols-5 gap-2">
        {pandemicPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
