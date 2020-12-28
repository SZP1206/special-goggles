<template>
  <div class="article-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />

    <h1 class="title">文章标题</h1>

    <van-cell class="auth-info" title="作者" label="1小时前" center>
      <template #icon>
        <van-image round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </template>
      <template #right-icon>
        <van-button round type="info" icon="plus">关注</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [String, Number],
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
  methods: {},
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
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
    height: 40px;
  }
}
</style>
