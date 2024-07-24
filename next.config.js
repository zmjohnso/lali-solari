const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */

const config = withNextIntl({
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
});

module.exports = withNextIntl(config);
