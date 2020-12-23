<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell title="用户昵称" center>
        <template #icon>
          <van-image
            width="50"
            height="50"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #right-icon>
          <van-button round size="small">编辑资料</van-button>
        </template>
      </van-cell>
    </van-cell-group>

    <van-grid>
      <van-grid-item>
        <template #text>
          <div class="num">123</div>
          <div class="text">新闻</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #text>
          <div class="num">123</div>
          <div class="text">关注</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #text>
          <div class="num">123</div>
          <div class="text">粉丝</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #text>
          <div class="num">123</div>
          <div class="text">获赞</div>
        </template>
      </van-grid-item>
    </van-grid>

    <van-grid clickable :column-num="2">
      <van-grid-item class="like" icon="like-o" text="收藏" to="/" />
      <van-grid-item class="history" icon="underway-o" text="历史" to="/" />
    </van-grid>

    <van-cell title="消息通知" is-link url="/" />
    <van-cell title="智能助手" is-link to="/" />
    <van-cell class="logout" title="退出登录" is-link to="/" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
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
.my-container {
  .van-grid-item__content {
    .num {
      font-size: 16px;
    }
    .text {
      font-size: 16px;
    }
  }

  .like {
    /deep/ .van-grid-item__content {
      .van-icon-like-o {
        color: #eb5253;
      }
    }
  }

  .history {
    /deep/ .van-grid-item__content {
      .van-icon-underway-o {
        color: #ff9d1d;
      }
    }
  }

  .logout {
    .van-cell__title {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
