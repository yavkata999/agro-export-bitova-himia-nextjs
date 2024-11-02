/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  ...withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["res.cloudinary.com"],
    },
  }),
  ...withBundleAnalyzer({}),
};
