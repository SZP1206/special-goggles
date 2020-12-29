<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
    >
      <van-cell
        v-for="(comment, index) in commentList"
        :key="index"
        :title="comment.content"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'

export default {
  name: 'CommentList',
  components: {},
  props: {
    articleId: {
      type: String, // 测试文章：http://localhost:8080/#/article/140755
      required: true,
    },
  },
  data() {
    return {
      commentList: [], // 一级评论列表
      loading: false,
      finished: false,
      offset: null,
      pageSize: 10,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getComment(
        'a',
        this.articleId,
        this.offset,
        // eslint-disable-next-line comma-dangle
        this.pageSize
      )
      console.log(data)

      this.commentList.push(...data.data.results)
      this.loading = false

      if (data.data.total_count !== this.commentList.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
