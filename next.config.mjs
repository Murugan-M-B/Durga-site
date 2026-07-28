/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Allow local static images (served from /public)
    unoptimized: false,
  },
  // Serve durga-files from /durga-files route
  async rewrites() {
    return [
      {
        source: '/durga-files/:path*',
        destination: '/durga-files/:path*',
      },
      {
        source: '/assets/:path*',
        destination: '/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
