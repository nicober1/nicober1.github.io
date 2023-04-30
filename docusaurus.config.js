const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const {ProvidePlugin} = require('webpack')
const path = require('path')
const fs = require('fs')
const keywordslist = fs.readFileSync('./static/data/keywords.txt', 'utf-8')
const config = {
  themes: ['@docusaurus/theme-live-codeblock'],
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
                // {
                //   test: /\.json$/,
                //   loader: 'json-loader',
                //   include: path.resolve(__dirname, 'static/data'),
                // },
              ],
            },
            plugins: [
              new ProvidePlugin({
                process: require.resolve('process/browser'),
                React: 'react',
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
        id: 'azureblogs',
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
          routeBasePath: '/docs',
        },
        blog: {
          routeBasePath: '/blog',
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
    {
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
      crossorigin: 'anonymous',
      charset: 'utf-8',
    },
  ],
  stylesheets: [],
  themeConfig: {
    ssr: true,
    defaultMode: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    metadata: [
      {
        name: 'keywords',
        content: `${keywordslist}   blog, blogs, bookmark, science, .net, javascript, react, next.js, openai, chatgpt, azure, aws, google, asp.net, messi, python, react.js, gcp, tintin`,
      },
    ],
    image: 'img/fluentblogs.png',
    navbar: {
      title: 'Fluent Blogs',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/', label: 'Home'},
        {to: '/docs', label: 'Docs'},

        {
          type: 'dropdown',
          label: 'Search',
          position: 'left',
          items: [
            {
              to: '/wiki/search',
              label: 'Search @ Wikipedia',
            },
            {
              to: 'https://en.wikipedia.org/wiki/List_of_search_engines',
              label: 'List of Search Engine',
            },
            {
              to: '/worldbank/docsearch',
              label: 'Search Documents @ World Bank',
            },
          ],
        },

        {
          type: 'dropdown',
          label: 'News',
          position: 'left',
          items: [
            {
              to: '/news/business',
              label: 'Business News',
            },
            {
              to: '/news/science',
              label: 'Science News',
            },
            {
              to: '/news/technology',
              label: 'Technology News',
            },
            {
              to: '/news/sports',
              label: 'Sports News',
            },
            {
              to: '/news/entertainment',
              label: 'Entertainment News',
            },
            {
              to: '/news/general',
              label: 'General News',
            },
            {
              to: '/news/health',
              label: 'Health News',
            },
            {
              to: '/news/home',
              label: 'AutoPlay News - Covers All Categories ',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Radio',
          position: 'left',
          items: [
            {
              to: '/radio',
              label: 'Top Radio Stations of World',
            },
            {
              to: '/radio/india',
              label: 'Top Radio Stations of India',
            },
            {
              to: '/radio/us',
              label: 'Top Radio Stations of US',
            },
            {
              to: '/radio/gb',
              label: 'Top Radio Stations of UK',
            },

            {
              to: '/radio/mirchi',
              label: 'Radio Mirchi - India',
            },
            {
              to: '/radio/bbc',
              label: 'BBC Radio Stations',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Live',
          position: 'left',
          items: [
            {
              to: '/live/news',
              label: 'News Live',
            },
            {
              to: '/live/nasa',
              label: 'NASA Live',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Books - BestSeller',
          position: 'left',
          items: [
            {
              to: '/nyt/fiction',
              label: 'HardCover Fiction',
            },
            {
              to: '/nyt/nonfiction',
              label: 'HardCover Non-Fiction',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Gallery',
          position: 'left',
          items: [
            {
              to: '/gallery/space',
              label: 'Space & Astronomy',
            },
            {
              to: '/gallery/leonardo',
              label: 'Leonardo da Vinci Artworks and Drawings',
            },
            {
              to: '/gallery/gogh',
              label: 'Vincent Van Gogh Artworks',
            },
            {
              to: '/gallery/picasso',
              label: 'Pablo Picasso Artworks',
            },
            {
              to: '/gallery/art',
              label: 'Art',
            },
            {
              to: '/gallery/pics',
              label: 'Beautiful Pictures',
            },
          ],
        },
        {to: '/blog', label: 'Blogs'},
        {
          type: 'dropdown',
          label: 'Others',
          position: 'left',
          items: [
            {
              to: '/nse/fo',
              label: 'FnO Stocks - India',
            },
            {
              to: '/nse/nifty50',
              label: 'Nifty50 - India',
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
      additionalLanguages: ['git', 'csharp', 'xml-doc'],
    },
  },
}
module.exports = config
