<template>
  <div class="comment-item">
    <van-cell>
      <template #icon>
        <van-image round :src="comment.aut_photo" />
      </template>

      <div slot="title">
        <div class="top">
          <div class="author">{{ comment.aut_name }}</div>
          <div>
            <van-icon
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              @click="onLike"
            />
            <span>{{
              comment.is_liking ? comment.like_count + 1 : comment.like_count
            }}</span>
          </div>
        </div>

        <!-- <span>{{ comment.content }}</span> -->
        <div>{{ comment.content }}</div>
      </div>

      <template #label>
        <span>{{ comment.pubdate | commentTime('MM-DD HH:mm') }}</span>
        <van-button type="default" plain round size="small">
          {{ comment.reply_count }}回复</van-button
        >
      </template>
    </van-cell>
  </div>
</template>

<script>
import { likeComment, unlikeComment } from '@/api/comment'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLike() {
      if (this.comment.is_liking) {
        const res = await unlikeComment(this.comment.com_id.toString())
        console.log('取消', res)
        if (res.status === 204) {
          this.comment.is_liking = !this.comment.is_liking
        }
      } else {
        const res = await likeComment(this.comment.com_id.toString())
        console.log('点赞', res)
        if (res.status === 201) {
          this.comment.is_liking = !this.comment.is_liking
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.comment-item {
  .van-image {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .van-cell__title {
    .top {
      display: flex;
      justify-content: space-between;
    }
    .author {
      font-size: 14px;
      color: #406599;
    }
    span {
      font-size: 16px;
      color: #222222;
    }

    .van-cell__label {
      span {
        font-size: 12px;
        margin-right: 10px;
      }
      .van-button {
        width: 72px;
        height: 24px;
      }
    }
  }
}
</style>
