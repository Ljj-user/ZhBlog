/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.111666.best",
      },
      {
        protocol: "https",
        hostname: "funingna-wakawaka.github.io",
      },
      {
        protocol: "https",
        hostname: "makitoid.github.io",
      },
      {
        protocol: "https",
        hostname: "madohomu.madokami.cn",
      },
    ],
  },
}

export default nextConfig
