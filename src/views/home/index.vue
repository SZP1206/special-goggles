<template>
  <div class="home-container">
    <van-nav-bar title="首页">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active">
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        {{ channel.name }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'

export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      const res = await getChannels()
      console.log(res)
      this.channels = res.data.data.channels
      console.log(this.channels)
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  .van-nav-bar {
    background-color: #1989fa;
    .van-icon-search {
      color: #323233;
      right: 18px;
    }
  }
}
</style>
