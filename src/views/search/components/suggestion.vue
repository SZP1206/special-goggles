<template>
  <div class="suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :title="suggestion"
      icon="search"
    ></van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'Suggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function() {
        const res = await getSuggestion(this.searchText)
        this.suggestions = res.data.data.options
        console.log(this.suggestions)
      }, 500),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped></style>
