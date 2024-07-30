import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(config);
