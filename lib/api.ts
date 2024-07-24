import "server-only";
import {
  MinimumHomePageResponse,
  MinimumHomePage,
  GalleryItem,
  GalleryItemResponse,
  AboutPageResponse,
  ManifestoPageResponse,
} from "./types";
import { Locale } from "@/src/app/shared/types";

const MANIFESTO_PAGE_QUERY = `
  query ($locale: String!) {
    manifiestoCollection(locale: $locale) {
      items {
        title
        description
        mediaCollection {
          items {
            title
            url
          }
        }
      }
    }
  }
`;

const ABOUT_PAGE_QUERY = `
  query ($locale: String!) {
    aboutCollection(locale: $locale) {
      items {
        title
        description
        mediaCollection {
          items {
            title
            url
          }
        }
      }
    }
  }
`;

const MINIMUM_HOME_PAGE_QUERY = `
  query ($locale: String!) {
    minimumHomePageCollection(locale: $locale) {
      items {
        title
        thumbnail {
          sys {
            id
          }
          title
          url
        }
      }
    }
  }
`;

const GALLERY_DISPLAY_PAGE_QUERY = `
  query ($locale: String!) {
    galleryPhotoCollection(locale: $locale) {
      items {
        title
        photo {
          title
          url
        }
        thumbnail {
          sys {
            id
          }
          title
          url
        }
        gallery {
          name
          description
        }
        paintingData {
          size
          technique
        }
      }
    }
  }
`;

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, any>,
  tag = ""
): Promise<T> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      // Associate all fetches with some cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: [tag] },
    }
  ).then((response) => response.json());
}

export async function getManifestoPageData(lang: Locale) {
  const variables = { locale: lang };
  const data = await fetchGraphQL<ManifestoPageResponse>(
    MANIFESTO_PAGE_QUERY,
    variables,
    "manifesto"
  );
  // there should only ever be one manifesto page, so we return the first item
  return data.data.manifiestoCollection.items[0];
}

export async function getAboutPageData(lang: Locale) {
  const variables = { locale: lang };
  const data = await fetchGraphQL<AboutPageResponse>(
    ABOUT_PAGE_QUERY,
    variables,
    "about"
  );
  // there should only ever be one about page, so we return the first item
  return data.data.aboutCollection.items[0];
}

export async function getMinimumHomePageData(
  lang: Locale
): Promise<MinimumHomePage[]> {
  const variables = { locale: lang };
  const data = await fetchGraphQL<MinimumHomePageResponse>(
    MINIMUM_HOME_PAGE_QUERY,
    variables,
    "minimumHomePage"
  );
  return data.data.minimumHomePageCollection.items;
}

export async function getGalleryDisplayPageData(
  lang: Locale
): Promise<GalleryItem[]> {
  const variables = { locale: lang };
  const data = await fetchGraphQL<GalleryItemResponse>(
    GALLERY_DISPLAY_PAGE_QUERY,
    variables,
    "galleryPhoto"
  );
  return data.data.galleryPhotoCollection.items;
}
