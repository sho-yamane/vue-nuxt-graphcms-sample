<template lang="pug">
  .blog
    header.header
      .header__thumb
        img(:src="`${gqlData.postImage.url}`")
      h1.header__title {{gqlData.postTitle}}
      .header__meta
        ul.header__meta__tags
          li(v-for="tag in gqlData.postTags")
            | {{tag}}
        time.header__meta__time(:datetime="gqlData.postDateAndTime")
          | {{dateFormat(gqlData.postDateAndTime)}}
    main.main
      .main__content
        vue-markdown(:source="gqlData.postContent")
    footer.footer
      .footer__authors
        .footer__authors__list(v-for="author in gqlData.authors")
          .footer__author__list__pic
            img(:src="`${author.authorImage.url}`")
          .footer__author__list__name
            h3 {{author.authorName}}
          .footer__author__list__bio(v-html="author.authorBibliography")
</template>

<script>
import blog from '~/apollo/queries/blog'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  apollo: {
    gqlData: {
      query: blog,
      prefetch: ({ route }) => ({ slug: route.params.id }),
      variables () {
        return { slug: this.$route.params.id }
      },
      update: data => data.BlogPost
    }
  },
  methods: {
    dateFormat (date) {
      const dateSplit = date.replace(/ /g, '-').split('-')
      const y = dateSplit[0]
      const m = parseInt(dateSplit[1], 10)
      const ds = dateSplit[2].split('T')
      const d = ds[0]
      return y + '.' + m + '.' + d
    }
  }
}
</script>

<style lang="scss">

$breakpoints: (
  'normal': 'screen and (max-width: 800px)'
) !default;

@mixin mq($breakpoint: normal) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}

.blog {
  max-width: 800px;
  width: 100%;
  margin: 4rem auto;
  @include mq() {
    margin: 2rem auto;
    padding: 0 1rem;
  }
  header.header {
    margin-bottom: 2rem;
    .header__thumb {
      margin-bottom: 1.25rem;
      img {
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }
    }
    h1.header__title {
      font-size: 24px;
      margin-bottom: 1.25rem;
    }
    .header__meta {
      &:after {
        content: '';
        display: table;
        clear: both;
      }
      ul.header__meta__tags {
        list-style: none;
        padding: 0;
        float: right;
        li {
          float: left;
          margin-right: 0.5rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      time.header__meta__time {
        float: left;
      }
    }
  }
  main.main {
    margin-bottom: 2rem;
    .main__content {
      h2 {
        margin: 2rem 0 1.25rem;
      }
      h3 {
        margin: 1.5rem 0 1.25rem;
      }
      p {
        margin: 0 0 1.25rem;
        &:last-child {
          margin: 0;
        }
      }
      ul {
        margin: 0 0 1.25rem;
        li {

        }
      }
    }
  }
  footer.footer {
    .footer__authors {
      .footer__authors__list {
        padding: 2rem;
        border: 1px solid #eaeaea;
        .footer__author__list__pic {
          margin-bottom: 1.25rem;
          img {
            border-radius: 50%;
            width: 64px;
            height: 64px;
            vertical-align: bottom;
            display: block;
            margin: 0 auto;
          }
        }
        .footer__author__list__name {
          h3 {
            text-align: center;
            margin-bottom: 1.25rem;
          }
        }
        .footer__author__list__bio {
          line-height: 1.7;
          text-align: center;
        }
      }
    }
  }
}
</style>
