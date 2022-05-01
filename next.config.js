/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/setting-page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/main-page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/help-page",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
