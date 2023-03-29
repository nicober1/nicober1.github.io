const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const {ProvidePlugin} = require('webpack')
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
          sidebarPath: require.resolve('./sidebars.js'),
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
  ],
  stylesheets: [],
  themeConfig: {
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
        {to: '/blog', label: 'Blogs'},
        {to: '/radio', label: 'Radio'},
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
