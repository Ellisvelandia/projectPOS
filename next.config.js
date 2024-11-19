/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./my-loader.ts",
  },
};

module.exports = nextConfig;
