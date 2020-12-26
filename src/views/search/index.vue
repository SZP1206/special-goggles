<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <!-- 联想建议 -->
    <suggestion></suggestion>

    <!-- 历史记录 -->
    <history></history>

    <!-- 搜索结果 -->
    <result></result>
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
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      console.log('onSearch', this.searchText)
    },
  },
}
</script>

<style lang="less" scoped></style>
