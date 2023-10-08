/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'unavatar.io'],
  },
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      {
        source: '/new',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/x/:path',
        destination: '/:path',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
