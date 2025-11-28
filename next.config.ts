import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';
 
const withNextIntl = createNextIntlPlugin(
  // This is the default (also the recommended)
  // setup for Next.js App Router
  './src/i18n.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
