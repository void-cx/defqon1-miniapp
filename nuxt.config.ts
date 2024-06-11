// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "nuxt-mongoose",
    "nuxt3-leaflet"
  ],
  app: {
    head: {
      title: 'VOID @ DEFQON.1 Mini App',
      link: [
        { rel: 'stylesheet', href:'https://cdn.msit.systems/font-awesome/web/css/all.min.css', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover' }
      ],
      script: [
        {
          defer: true,
          src: 'https://click.msit.systems/js/script.js',
          'data-domain': 'defqon1.void.cx',
        }
      ]
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})