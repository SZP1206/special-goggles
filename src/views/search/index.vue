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
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
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
