<template>
  <div class="channel-edit">
    <van-cell>
      <template #title> 我的频道 </template>
      <template>
        <van-button
          class="editBtn"
          type="danger"
          plain
          size="small"
          round
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>

    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="(channel, index) in channels"
        :key="channel.id"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        @click="onUserChannelClick(index)"
      />
    </van-grid>

    <van-cell>
      <template #title> 推荐频道 </template>
    </van-cell>

    <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in recommendChannel"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allChannel: [],
      isEdit: false,
    }
  },
  computed: {
    recommendChannel() {
      return this.allChannel.filter(allChannel => {
        return !this.channels.find(userChannel => {
          return userChannel.id === allChannel.id
        })
      })
    },
  },
  watch: {},
  created() {
    this.loadAllChannel()
  },
  mounted() {},
  methods: {
    async loadAllChannel() {
      const { data } = await getAllChannel()
      this.allChannel = data.data.channels
      console.log(this.allChannel)

      // const arr1 = [1, 2, 3, 4, 5, 6]
      // console.log(arr1.includes(2, 2)) // false
      // console.log(arr1.includes(2, -1)) // false
      // console.log(arr1.includes(2, -5)) // true
      // console.log(arr1.includes(2, -4)) // false

      // arr.includes(valueToFind[, fromIndex])
      // 第一个参数 valueToFind ：要查找的元素

      // 第二个参数：要从索引“fromIndex”处开始查找。
      // 若为负数，则从“array.length + fromIndex”处开始查找

      // const arr2 = [1, 2, 3]
      // const arr3 = [1, 2, 3, 4, 5]
      // const newArr = arr3.filter(item => {
      //   return !arr2.includes(item)
      // })
      // console.log(newArr) // [4, 5]
    },

    onAdd(channel) {
      this.channels.push(channel)
    },

    // 点击用户频道
    onUserChannelClick(index) {
      if (index !== 0 && this.isEdit) {
        this.deleteChannel(index)
      } else {
        this.switchChannel(index)
      }
    },

    // 删除用户频道
    deleteChannel(index) {
      this.channels.splice(index, 1)
    },

    // 切换用户频道
    switchChannel(index) {
      console.log('switch')
      this.$emit('switchActive', index)
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 60px;

  .editBtn {
    width: 64px;
  }

  .van-cell__title {
    font-size: 16px;
    color: #333333;
  }

  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
    /deep/ .van-icon {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
}
</style>
