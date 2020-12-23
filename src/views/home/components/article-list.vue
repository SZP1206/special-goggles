<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="freshText"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的"
        @load="onLoad"
      >
        <van-cell
          v-for="article in articleList"
          :key="article.art_id"
          :title="article.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: null,
      freshText: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      })
      console.log(res)

      const articleList = res.data.data.results
      this.articleList.push(...articleList)

      this.loading = false

      if (articleList) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      })

      const articleList = res.data.data.results
      this.articleList.unshift(...articleList)

      this.refreshing = false
      this.freshText = `刷新了${articleList.length}条数据`
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 46px;
  overflow-y: auto;
}
</style>
