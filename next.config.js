/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    console.log('ok',process.env.NEXT_PUBLIC_URL_SERVER)
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_URL_SERVER}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
      },
    ];
  },
}

module.exports = nextConfig
