<template>
  <div class="article-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <h1 class="title">{{ article.title }}</h1>

    <van-cell
      class="auth-info"
      :title="article.aut_name"
      :label="article.pubdate | relativeTime"
      center
    >
      <template #icon>
        <van-image round fit="cover" :src="article.aut_photo" />
      </template>
      <template #right-icon>
        <van-button
          round
          type="info"
          :plain="article.is_followed"
          :icon="article.is_followed ? 'success' : 'plus'"
          :loading="isBtnLoading"
          @click="onFollow"
        >
          {{ article.is_followed ? '已关注' : '关注' }}
        </van-button>
      </template>
    </van-cell>

    <div ref="content" class="markdown-body" v-html="article.content"></div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import { followAuthor, unfollowAuthor } from '@/api/user'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      isBtnLoading: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      console.log(this.article)

      // 操作 DOM
      this.$nextTick(() => {
        this.handleImagePreview()
      })
    },

    handleImagePreview() {
      // 获取所有 img 标签
      const imgs = this.$refs.content.querySelectorAll('img')

      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)

        img.onclick = () => {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          })
        }
      })
    },

    async onFollow() {
      // 防止多次点击
      this.isBtnLoading = true

      if (this.article.is_followed) {
        await unfollowAuthor(this.article.aut_id)
        console.log('unfo')
      } else {
        await followAuthor(this.article.aut_id)
        console.log('fo')
      }
      this.article.is_followed = !this.article.is_followed

      this.isBtnLoading = false
      // 接口有问题，刷新后发现数据未持久化。Network里状态码返回正确。
    },
  },
}
</script>

<style lang="less" scoped>
.article-container {
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    margin: 0;
  }

  .auth-info {
    .van-image {
      width: 45px;
      height: 45px;
      margin-right: 9px;
    }
    .van-cell__title {
      span {
        font-size: 14px;
        color: #333333;
      }
      .van-cell__label {
        font-size: 12px;
        color: #b4b4b4;
      }
    }
    .van-button {
      width: 95px;
      height: 40px;
    }
  }

  .markdown-body {
    padding: 14px;
  }
}
</style>
