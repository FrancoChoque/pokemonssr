/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const withCSS = require('@zeit/next-css');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const path = require('path');

module.exports = withCSS({
  cssModules: true,
  webpack(config, { isServer, buildId, dev }) {
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next',
      },
      importScripts: [
        'static/push-notifications-controller.js',
      ],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /[^3]\/favorites\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: new RegExp('^https://pokeapi.co/api/v2/pokemon/'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    };
    // if (!isServer && !dev) {
    config.plugins.push(
      new NextWorkboxPlugin({
        buildId,
        ...workboxOptions,
      }),
      new WebpackPwaManifest({
        filename: 'static/manifest.json',
        name: 'Pokemon Finder',
        short_name: 'Pokefinder',
        description: 'A Pokemon PWA using Next.js and Google Workbox',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('static/favicon.ico'),
            sizes: ['256x256'],
            destination: '/static',
          },
          {
            src: path.resolve('static/pokeballBig.png'),
            sizes: ['512x512'],
            destination: '/static',
          },
          {
            src: path.resolve('static/pokeballSmol.png'),
            sizes: ['192x192'],
            destination: '/static',
          },
        ],
        theme_color: '#5755d9',
        display: 'standalone',
        orientation: 'portrait',
        fingerprints: false,
        inject: false,
        publicPath: '..',
        start_url: '/',
        includeDirectory: true,
        ios: {
          'apple-mobile-web-app-title': 'Pokemon-PWA',
          'apple-mobile-web-app-status-bar-style': '#5755d9',
        },
      }),
    );
    // }

    return config;
  },
});
