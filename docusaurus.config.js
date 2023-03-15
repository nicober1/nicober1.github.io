const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { ProvidePlugin } = require("webpack");

const config = {
  title: "Fluent Blogs",
  tagline: "",
  favicon: "img/favicon.ico",

  url: "https://nicober.org",
  baseUrl: "/",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    function tailwindPlugin(context, options) {
      return {
        name: "tailwind-plugin",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
          ];
          return postcssOptions;
        },
      };
    },
    function webpackPlugin(context, options) {
      return {
        name: "webpack-plugin",
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
                process: require.resolve("process/browser"),
              }),
            ],
            resolve: {
              fallback: {
                stream: require.resolve("stream-browserify"),
                path: require.resolve("path-browserify"),
                buffer: require.resolve("buffer/"),
                url: require.resolve("url"),
                crypto: false,
              },
              alias: {
                process: "process/browser.js",
              },
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Fluent Blogs",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        { to: "/blog", label: "Blogs", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
