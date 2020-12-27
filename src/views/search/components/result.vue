<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'

export default {
  name: 'Result',
  components: {},
  props: {
    searchText: {
      type: String,
      requeired: true,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      query: {
        page: 1,
        per_page: 20,
        q: this.searchText,
      },
      results: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 请求获取数据
      const { data } = await getResult(this.query)
      console.log(data)
      const results = data.data.results
      this.results.push(...results)

      // 关闭本次 loading
      this.loading = false

      if (results.length) {
        this.query.page++
      } else {
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  .van-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
