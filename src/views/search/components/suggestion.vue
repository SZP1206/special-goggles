<template>
  <div class="suggestion">
    <van-cell
      v-for="(suggestion, index) in suggestions"
      :key="index"
      icon="search"
    >
      <span slot="title" v-html="highLight(suggestion)"></span>
      <!-- <template #title v-html="hightLight(suggestion)"></template> -->
    </van-cell>
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
  methods: {
    highLight(suggestion) {
      return suggestion.replace(
        new RegExp(this.searchText, 'gi'),
        // eslint-disable-next-line comma-dangle
        `<span style="color: red">${this.searchText}</span>`
      )
    },
  },
}
</script>

<style lang="less" scoped></style>
