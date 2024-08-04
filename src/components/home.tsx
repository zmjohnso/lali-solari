import { useTranslations } from "next-intl";
import { extractTitle } from "@/src/shared/utilities";
import { MinimumHomePage } from "@/lib/types";
import { Link } from "../navigation";
import PhotoGridItem from "./photoGridItem";

interface HomePageProps {
  homePage: MinimumHomePage[];
}

export default function Home({ homePage }: HomePageProps) {
  const t = useTranslations("Home");

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
        <h1 className="font-bold font-bebas uppercase -mt-3 text-[clamp(2rem,18vw,20rem)] hover:text-neon-green -mb-4 md:-mb-12 ml-20 md:ml-32 animate-slide-in-right-slow">
          {t("manifesto")}
        </h1>
      </Link>
      <div className="flex flex-row gap-8 mx-auto">
        <Link href="/about">
          <h1
            className="font-bold font-bebas text-[clamp(2rem,16vw,18rem)] hover:text-neon-green animate-slide-in-left-medium"
            lang="en"
          >
            ABOUT
          </h1>
        </Link>
        <a
          href="https://www.etsy.com/es/shop/Lalisolariart"
          target="_blank"
          rel="noopener noreferrer"
          className="content-end"
        >
          <h2
            className="font-bold font-bison italic text-[clamp(2rem,16vw,18rem)] hover:text-neon-green animate-slide-in-right-fast"
            lang="en"
          >
            GALLERY
          </h2>
        </a>
      </div>
      <Link href="/contact">
        <h2
          className="font-bold font-bebas text-[clamp(2rem,11vw,18rem)] hover:text-neon-green mr-14 md:mr-28 animate-slide-in-left-slow"
          lang="en"
        >
          CONTACT
        </h2>
      </Link>
      <Link href="/exclusive-designs">
        <h2
          className="font-bold font-bison italic text-[clamp(0.5rem,6vw,8rem)] hover:text-neon-green ml-28 md:ml-72 animate-slide-in-right-medium"
          lang="en"
        >
          EXCLUSIVE DESIGNS
        </h2>
      </Link>
      <Link href={`/gallery/${arPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas uppercase text-center text-[clamp(2rem,6vw,10rem)] mb-1 mt-6">
          {abstractReverberationsName}
        </h2>
      </Link>
      <div className="grid grid-cols-5 gap-4">
        {arPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`/gallery/${rootsPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas uppercase text-center text-[clamp(2rem,6vw,10rem)] mt-8 mb-2">
          {rootsName}
        </h2>
      </Link>
      <div className="grid grid-cols-3 gap-4">
        {rootsPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`/gallery/${symbiosisPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas uppercase text-center text-[clamp(2rem,6vw,10rem)] mt-8 mb-2">
          {symbiosisName}
        </h2>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        {symbiosisPhotos.map((photo) => (
          <PhotoGridItem
            key={photo.thumbnail.title}
            thumbnail={photo.thumbnail}
          />
        ))}
      </div>
      <Link href={`/gallery/${pandemicPhotos[0].thumbnail.sys.id}`}>
        <h2 className="font-bold font-bebas uppercase text-center text-[clamp(2rem,6vw,10rem)] mt-8 mb-2">
          {pandemicName}
        </h2>
      </Link>
      <div className="grid grid-cols-5 gap-4">
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
