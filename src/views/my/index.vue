<template>
  <div class="my-container">
    <van-cell-group v-if="user">
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
    </van-cell-group>

    <div v-else class="login">
      <van-icon name="phone" color="#1989fa" />
      <div>点击登录</div>
    </div>

    <van-grid clickable :column-num="2">
      <van-grid-item class="like" icon="like-o" text="收藏" to="/" />
      <van-grid-item class="history" icon="underway-o" text="历史" to="/" />
    </van-grid>

    <van-cell title="消息通知" is-link url="/" />
    <van-cell title="智能助手" is-link to="/" />
    <van-cell v-if="user" class="logout" title="退出登录" is-link to="/" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
  },
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

  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .van-icon-phone {
      font-size: 50px;
    }
  }
}
</style>
