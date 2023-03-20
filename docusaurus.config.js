const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const {ProvidePlugin} = require('webpack')

const config = {
  title: 'Fluent Blogs',
  tagline: 'Words that flow, ideas that grow',
  favicon: 'img/logo.png',

  url: 'https://fluentblogs.com',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-QBE7EB505B',
        anonymizeIP: true,
      },
    ],
    function tailwindPlugin(context, options) {
      return {
        name: 'tailwind-plugin',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
          return postcssOptions
        },
      }
    },
    function webpackPlugin(context, options) {
      return {
        name: 'webpack-plugin',
        configureWebpack(config) {
          return {
            module: {
              rules: [
                {
                  test: /\.m?js/,
                  resolve: {
                    fullySpecified: false,
                  },
                },
              ],
            },
            plugins: [
              new ProvidePlugin({
                process: require.resolve('process/browser'),
              }),
            ],
            resolve: {
              fallback: {
                stream: require.resolve('stream-browserify'),
                path: require.resolve('path-browserify'),
                buffer: require.resolve('buffer/'),
                url: require.resolve('url'),
                crypto: false,
              },
              alias: {
                process: 'process/browser.js',
              },
            },
          }
        },
      }
    },
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'azure',

        routeBasePath: 'azure-blogs',

        path: './blogs/azure',
        blogSidebarTitle: 'Azure',
        blogSidebarCount: 'ALL',
        postsPerPage: 'ALL',
        showReadingTime: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          routeBasePath: '/',
          blogSidebarTitle: 'Blogs',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6812671644017150',
      async: true,
      crossorigin: 'anonymous',
    },
  ],
  stylesheets: [],

  themeConfig: {
    defaultMode: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    metadata: [
      {
        name: 'keywords',
        content: 'blog, blogs, bookmark, science, .net, javascript, react, next.js, openai, chatgpt, azure, aws, google, asp.net, messi, python, react.js, gcp, tintin',
      },
    ],
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Fluent Blogs',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/countries', label: 'Countries', position: 'left'},
        // {to: '/stocklist', label: 'Stocks', position: 'left'},
        {to: '/cryptoprices', label: 'Cryptocurrencies', position: 'left'},
        {to: '/', label: 'Blogs', position: 'left'},
        {to: '/live', label: 'Live', position: 'left'},
        {to: '/bookmarks', label: 'Bookmarks', position: 'left'},
        {
          type: 'dropdown',
          label: 'Miscellaneous',
          position: 'left',
          items: [
            {
              to: '/apod',
              label: 'NASA Astronomy Picture of the Day',
            },
            {
              to: '/codelive',
              label: 'React Live Code Editor',
            },
            {
              to: '/gallery',
              label: 'Gallery',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
}

module.exports = config
