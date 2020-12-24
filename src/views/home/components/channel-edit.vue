<template>
  <div class="channel-edit">
    <van-cell>
      <template #title> 我的频道 </template>
      <template>
        <van-button class="editBtn" type="danger" plain size="small" round >编辑</van-button>
      </template>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="(value, index) in 8" :key="index" text="文字" />
    </van-grid>

    <van-cell>
      <template #title> 推荐频道 </template>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="(value, index) in 8" :key="index" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
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
.channel-edit {
  padding-top: 60px;

  .editBtn{
    width: 64px;
  }

  .van-cell__title {
    font-size: 16px;
    color: #333333;
  }

  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
  }
}
</style>
