"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _colors = _interopRequireDefault(require("vuetify/es5/util/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - blog',
    title: 'blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: ''
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: '/js/bundle.js'
    }, {
      src: '/js/live2dcubismcore.js'
    }, {
      src: '/js/run.js'
    }]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  env: {
    aliOSS_baseUrl: process.env.ALI_OSS_BASE_URL,
    aliOSS_region: process.env.ALI_OSS_REGION,
    aliOSS_bucket: process.env.ALI_OSS_BUCKET
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [// https://go.nuxtjs.dev/typescript
  '@nuxt/typescript-build', // https://go.nuxtjs.dev/vuetify
  '@nuxtjs/vuetify'],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [// https://go.nuxtjs.dev/axios
  '@nuxtjs/axios',, '@nuxtjs/auth-next'],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://localhost:4000/api'
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: _colors["default"].blue.darken2,
          accent: _colors["default"].grey.darken3,
          secondary: _colors["default"].amber.darken3,
          info: _colors["default"].teal.lighten1,
          warning: _colors["default"].amber.base,
          error: _colors["default"].deepOrange.accent4,
          success: _colors["default"].green.accent3
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend: function extend(config, _ref) {
      var isDev = _ref.isDev,
          isClient = _ref.isClient;
      config.node = {
        fs: 'empty'
      };
    }
  }
};
exports["default"] = _default;