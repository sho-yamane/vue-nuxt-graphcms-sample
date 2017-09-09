module.exports = {
  head: {
    title: 'nuxt-graphcms-sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  build: {
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: ['@nuxtjs/apollo'],
  apollo: {
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
    }
  },
  generate: {
    routes: [
      '/blog/1'
    ]
  }
}
