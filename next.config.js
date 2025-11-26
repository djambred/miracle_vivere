/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output untuk Docker optimization
  output: 'standalone',
  
  // Optimization settings
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Headers untuk SEO dan Security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
  
  // Redirects (jika diperlukan)
  async redirects() {
    return [
      // Contoh redirect
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },
  
  // Environment variables yang di-expose ke browser
  env: {
    SITE_NAME: 'Miracle Vivere Portfolio',
    SITE_URL: 'https://miraclevivere.com',
  },
  
  // Webpack custom config (optional)
  webpack: (config, { isServer }) => {
    // Custom webpack configurations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig;