import "server-only";
import {
  MinimumHomePageResponse,
  MinimumHomePage,
  GalleryItem,
  GalleryItemResponse,
  AboutPageResponse,
  ManifestoPageResponse,
  ContentfulLocale,
} from "./types";

const MANIFESTO_PAGE_QUERY = `
  query ($locale: String!) {
    manifiestoCollection(locale: $locale) {
      items {
        title
        description
        media {
          title
          url
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
        titlePhoto {
          title
          url
        }
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
  retries: number = 3, // Default number of retries
  delay: number = 1000 // Delay between retries in milliseconds
): Promise<T | undefined> {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const res = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ query, variables }),
          next: { tags: ["portfolioContent"] },
        }
      );

      if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(
          `Failed to fetch from Contentful: ${res.status} ${res.statusText}. ${errorDetail}`
        );
      }

      const data = await res.json();
      return data as T;
    } catch (error) {
      if (attempt < retries) {
        attempt++;
        console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        if (error instanceof Error) {
          console.error(`Error in fetchGraphQL: ${error.message}`);
        } else {
          console.error(`Unexpected error: ${error}`);
        }
        return undefined;
      }
    }
  }
}

// TODO: what photo should be used for the open graph image?
export async function getOpenGraphImage(lang: ContentfulLocale) {
  const variables = { locale: lang };
  const data = await fetchGraphQL<AboutPageResponse>(
    ABOUT_PAGE_QUERY,
    variables
  );
  // there should only ever be one about page, so we return the first item
  return data?.data.aboutCollection.items[0].titlePhoto.url;
}

export async function getManifestoPageData(lang: ContentfulLocale) {
  const variables = { locale: lang };
  const data = await fetchGraphQL<ManifestoPageResponse>(
    MANIFESTO_PAGE_QUERY,
    variables
  );
  // there should only ever be one manifesto page, so we return the first item
  return data?.data.manifiestoCollection.items[0];
}

export async function getAboutPageData(lang: ContentfulLocale) {
  const variables = { locale: lang };
  const data = await fetchGraphQL<AboutPageResponse>(
    ABOUT_PAGE_QUERY,
    variables
  );
  // there should only ever be one about page, so we return the first item
  return data?.data.aboutCollection.items[0];
}

export async function getMinimumHomePageData(
  lang: ContentfulLocale
): Promise<MinimumHomePage[] | undefined> {
  const variables = { locale: lang };
  const data = await fetchGraphQL<MinimumHomePageResponse>(
    MINIMUM_HOME_PAGE_QUERY,
    variables
  );
  return data?.data.minimumHomePageCollection.items;
}

export async function getGalleryDisplayPageData(
  lang: ContentfulLocale
): Promise<GalleryItem[] | undefined> {
  const variables = { locale: lang };
  const data = await fetchGraphQL<GalleryItemResponse>(
    GALLERY_DISPLAY_PAGE_QUERY,
    variables
  );
  return data?.data.galleryPhotoCollection.items;
}
