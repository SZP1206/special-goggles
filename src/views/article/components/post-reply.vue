<template>
  <div class="post-reply-container">
    <van-field
      v-model.trim="replyText"
      type="textarea"
      maxlength="140"
      autosize
      autofocus
      placeholder="请输入回复"
      show-word-limit
    />
    <van-button plain type="info" @click="onReply" :disabled="!replyText"
      >发表评论</van-button
    >
  </div>
</template>

<script>
import { postReply } from '@/api/comment'

export default {
  name: 'PostReply',
  components: {},
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true,
    },
  },
  data() {
    return {
      replyText: '',
      art_id: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 评论文章
    async onReply() {
      this.$toast.loading({
        message: '发布中……',
        forbidClick: true,
      })

      const res = await postReply(this.articleId, this.replyText, this.art_id)
      console.log(res)
      if (res.status !== 201) {
        this.$toast.error('评论失败，请稍后重试')
      } else {
        this.$toast.success('评论成功')

        this.$emit('post-success', res.data.data.new_obj)

        // 清空输入框
        this.replyText = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.post-reply-container {
  display: flex;
  align-items: center;

  .van-button {
    margin: 16px;
  }
}
</style>
