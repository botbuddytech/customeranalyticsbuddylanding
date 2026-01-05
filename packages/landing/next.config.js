const withPlugins = require('next-compose-plugins');
const path = require('path');

const nextConfig = {
  // Vercel deployment configuration
  output: 'standalone',
  
  images: {
    domains: ['pbs.twimg.com'],
    unoptimized: true, // For static export compatibility
  },
  
  // SEO Optimizations
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issues
  },

  // API route body size limit (increase for image uploads)
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase limit for base64 image uploads
    },
    responseLimit: '10mb',
  },
  
  // Webpack configuration for better builds
  webpack: (config, { isServer }) => {
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
};

module.exports = withPlugins([], nextConfig);
