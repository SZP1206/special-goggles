<template>
  <div class="history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('delete')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in history"
      :key="index"
      :title="item"
      @click="onDelete(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="close" />
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
    return {
      isDeleteShow: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 删除历史记录
    // onDelete(item, index) {
    //   // 删除状态进行删除操作
    //   if (this.isDeleteShow) {
    //     this.history.splice(index, 1)
    //   } else {
    //     // 非删除状态，跳转搜索
    //     this.$emit('search', item)
    //   }
    // },

    onDelete(item, index) {
      // 删除状态进行删除操作
      if (this.isDeleteShow) {
        this.history.splice(index, 1)
        // 没有删除单个历史记录的api接口，此处不做操作
      } else {
        // 非删除状态，跳转搜索
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
