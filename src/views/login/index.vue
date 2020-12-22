<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />

    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="onLogin"
      @failed="onFail"
    >
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          clearable
          left-icon="phone-circle-o"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          left-icon="warning-o"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-button size="mini" type="plain" round>发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>

      <van-button type="info" block>登录</van-button>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '17090086870',
        code: '246810',
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[0123456789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号',
          },
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
      }
    },

    // 自定义验证失败的提示
    onFail(error) {
      console.log(error)
      this.$toast({
        message: error.errors[0].message,
        position: 'top',
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
