/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://shosh-gallery.netlify.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
