<template>
  <div class="article-container">
    <div class="top">
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

      <!-- 评论组件 -->
      <comment-list :articleId="articleId"></comment-list>
    </div>

    <div class="bottom">
      <van-button plain round>写评论</van-button>
      <van-icon name="comment-o" badge="9" />
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : ''"
        @click="collect"
      />
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#1989fa' : ''"
        @click="like"
      />
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticleById,
  likeArticle,
  unlikeArticle,
  collectArticle,
  uncollectArticle,
} from '@/api/article'
import { ImagePreview } from 'vant'
import { followAuthor, unfollowAuthor } from '@/api/user'
import CommentList from './components/comment-list.vue'

export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},

      // 按钮 loading 状态
      isBtnLoading: false,
      isCollectLoading: false,
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

    async like() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 1000,
      })

      if (this.article.attitude === 0 || this.article.attitude === -1) {
        const res = await likeArticle(this.articleId)
        console.log('like', res)
        if (res.status === 201) {
          this.article.attitude = 1
          // api 有问题，status正常，实际上数据未持久化
        }
      } else {
        const res = await unlikeArticle(this.articleId)
        console.log('unlike', res)
        if (res.status === 204) {
          this.article.attitude = -1
          // api 有问题，status正常，实际上数据未持久化
        }
      }
    },

    async collect() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 1000,
      })

      if (this.article.is_collected) {
        const res = await uncollectArticle(this.articleId)
        console.log('un', res)
        if (res.status === 204) {
          this.article.is_collected = false
        }
      } else {
        const res = await collectArticle(this.articleId)
        console.log(res)
        if (res.status === 201) {
          this.article.is_collected = true
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.article-container {
  .top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 44px;
    overflow-y: auto;
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

  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #ffffff;
    .van-button {
      width: 141px;
      height: 23px;
      border: 1px solid #ffffff;
      .van-button__text {
        font-size: 15px;
        line-height: 23px;
        color: #a7a7a7;
      }
    }
    .van-icon {
      font-size: 26px;
    }
  }
}
</style>
