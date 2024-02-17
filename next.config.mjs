/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.rigi.club",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
