<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <result v-if="isResultShow" :search-text="searchText"></result>

    <!-- 联想建议 -->
    <suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch($event)"
    ></suggestion>
    <!-- onSearch($event) === onSearch 【不加括号】 -->

    <!-- 历史记录 -->
    <history v-else :history="history"></history>

    <!-- 1、suggestion 和 history 二选一，条件是“输入框是否为空”【二选一，置于判断的末尾】
    2、search 事件切换 result 的展示和隐藏。
    3、result 展示，后续不再展示。【三选一，置于首】 -->
  </div>
</template>

<script>
import History from './components/history.vue'
import Result from './components/result.vue'
import Suggestion from './components/suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
import { getHistory } from '@/api/search'

export default {
  name: 'SearchIndex',
  components: { Suggestion, Result, History },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      history: [],
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadHistory()
  },
  mounted() {},
  methods: {
    onSearch(searchText) {
      // 接受子组件传过来的值，并同步到搜索框
      this.searchText = searchText
      this.isResultShow = true

      const index = this.history.indexOf(this.searchText)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(this.searchText)

      // 将搜索历史存储本地
      setItem('search-history', this.history)
    },

    async loadHistory() {
      // 获取本地搜索历史
      const localHistory = getItem('search-history')

      // 如果已登录，获取线上搜索历史
      if (this.user) {
        const { data } = await getHistory()
        const onlineHistory = data.data.keywords

        // 数组去重
        this.history = [...new Set([...localHistory, ...onlineHistory])]
      } else {
        // 未登录，获取本地搜索历史
        this.history = localHistory
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
