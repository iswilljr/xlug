/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'unavatar.io',
      },
      {
        hostname: 'uaparser.dev',
      },
      {
        hostname: 'flag.vercel.app',
      },
    ],
  },
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['iconoir-react', 'lucide-react', '@tremor/react'],
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
