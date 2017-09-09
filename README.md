# 「Vue.js + Nuxt.js + GraphCMS」サンプルサイト

<a href="https://explorer-combs-21111.netlify.com/">DEMO</a>

## GraphCMSの設定

<a href="https://www.sho-yamane.me/blog/3/" target="_blank">こちらの記事</a>を確認下さい。

## Vue.js + Nuxt.jsプロジェクトの作成

```bash
$ vue init nuxt-community/starter-template <project-name>
```

project-nameは適宜変更してください。

```bash
$ npm i --save-dev @nuxtjs/apollo graphql-tag node-sass pug sass-loader vue-apollo vue-markdown
```

pugとsassを使ってるのでそのパッケージも使ってますが必要なければ省いてください。

```nuxt.config.js
module.exports = {
  /* 省略 */
  modules: ['@nuxtjs/apollo'],
  apollo: {
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
    }
  },
  generate: {
    routes: [
      // 静的ファイル化するページを指定
      '/blog/1'
    ]
  }
}
```

```/apollo/network-interfaces/default.js
import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  const networkInterface = createNetworkInterface({
    // GraphCMSのSimple Endpoint（Relay EndpointでもOK）を指定する
    uri: 'https://api.graphcms.com/simple/v1/xxxxxxx'
  })
  return networkInterface
}
```

/apollo/network-interfaces/default.jsを作成してください。エンドポイントはGraphCMSのダッシュボードのSETTINGSから確認できます。

```/apollo/queries/blog.gql
query Blog($slug: String!) {
  BlogPost(
    postSlug: $slug
  ) {
    postTags
    postImage {
      url
    }
    postTitle
    postContent
    postDateAndTime
    authors {
      authorName
      authorImage {
        url
      }
      authorBibliography
    }
  }
}
```

/apollo/queries/blog.gqlを作成し、GraphQLを書いてください。上記は例です。GraphQLの書き方は<a href="https://www.sho-yamane.me/blog/3/" target="_blank">こちらの記事</a>やGraphCMSの公式ドキュメントを参照ください。

```/pages/blog/_id.vue
<script>
import blog from '~/apollo/queries/blog'
export default {
  apollo: {
    gqlData: {
      query: blog,
      prefetch: ({ route }) => ({ slug: route.params.id }),
      variables () {
        return { slug: this.$route.params.id }
      },
      update: data => data.BlogPost
    }
  }
</script>
```

importでGraphQLを読み込んで、gqlDataにデータを入れてます。viewの出力例は/pages/blog/_ide.vueを確認下さい。
