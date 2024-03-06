/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["images-ssl.gotinder.com", "lh3.googleusercontent.com"],
  },
}

export default nextConfig
