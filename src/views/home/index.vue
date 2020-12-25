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
        <article-list :channel="channel">
          <!-- 文章列表 -->
          <!-- 文章列表 -->
          <!-- 文章列表 -->
        </article-list>
      </van-tab>

      <div class="editBtn" slot="nav-right">
        <van-icon name="wap-nav" @click="isEditChannelShow = true" />
      </div>
    </van-tabs>

    <van-popup
      v-model="isEditChannelShow"
      position="bottom"
      closeable
      round
      get-container="body"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑组件 -->
      <channel-edit
        :channels="channels"
        :active="active"
        @close="isEditChannelShow = false"
        @switchActive="active = $event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isEditChannelShow: false,
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

  .editBtn {
    line-height: 44px;
  }
}
</style>
