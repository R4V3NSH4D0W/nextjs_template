import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer: _isServer }) => {
    // Exclude changelog files from builds for better performance
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        ...(config.watchOptions?.ignored || []),
        '**/CHANGELOG*.md',
        '**/changelogs/**',
        '**/scripts/**',
        '**/daily/**',
      ],
    };

    // Exclude changelog files from being processed by webpack
    config.module.rules.push({
      test: /\.(md)$/,
      include: [/changelogs/, /CHANGELOG/, /daily/],
      type: 'asset/resource',
      generator: {
        emit: false, // Don't emit these files to the build output
      },
    });

    return config;
  },

  // Exclude changelog directories from static file serving
  async rewrites() {
    return [];
  },
};

export default nextConfig;
