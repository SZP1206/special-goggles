<template>
  <div class="history">
    <van-cell title="搜索历史">
      <div>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <!-- <van-icon name="delete" /> -->
    </van-cell>
    <van-cell v-for="(item, index) in history" :key="index" :title="item">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'History',
  components: {},
  props: {
    history: {
      type: Array,
      requeired: true,
    },
  },
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

<style lang="less" scoped></style>
