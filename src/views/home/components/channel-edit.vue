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
        :class="index === active ? 'activeColor' : ''"
        @click="onUserChannelClick(channel, index)"
      />
      <!-- :class="index === active ? 'activeColor' : ''"
           :class="{ activeColor: index === active }" -->
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
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
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

    ...mapState(['user']),
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

    async onAdd(channel) {
      this.channels.push(channel)

      if (!this.user) {
        setItem('user-channel', this.channels)
      } else {
        const res = await addUserChannel({
          channels: [{ id: channel.id, seq: this.channels.length }],
        })
        console.log(res)
      }
    },

    // 点击用户频道
    onUserChannelClick(channel, index) {
      if (index !== 0 && this.isEdit) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },

    // 删除用户频道
    async deleteChannel(channel, index) {
      if (index <= this.active) {
        this.$emit('switchActive', this.active - 1)
      }
      this.channels.splice(index, 1)

      if (!this.user) {
        setItem('user-channel', this.channels)
      } else {
        const res = await deleteUserChannel(channel.id)
        console.log(res)
        // 204 删除成功.
        // 注意这是本接口成功调用的返回状态码，body没有数据（没有默认的message）
      }
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
  .activeColor {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>
