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
  computed: {},
  watch: {},
  created() {},
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
    },
  },
}
</script>

<style lang="less" scoped></style>
