<!-- 用户名密码登录 - 风格二 -->
<template>
  <div>账号密码登录</div>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <!-- 密码登录 -->
    <template v-if="type == 2">
      <t-form-item name="account">
        <t-input
          v-model="formData.username"
          size="large"
          placeholder="账户"
          autocomplete="both"
          :format="formataccount"
          clearable
        >
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="密码"
          :format="formataccount"
          onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
          autocomplete="both"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>自动登录</t-checkbox>
        <span class="font-bt tip">忘记密码</span>
      </div>
    </template>

    <t-form-item class="btn-container">
      <t-loading v-if="loadSt" indicator class="bt load"></t-loading>
      <button v-else class="bt" type="submit">登录</button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next'
import { useUserStore } from '@/store'
import { userLogins, getUserInfo } from '@/api/user'
import { validateCode } from '@/utils/validate'
// tab切换数据
const userStore = useUserStore()
// 登录loadding
const loadSt = ref(false)

const INITIAL_DATA = {
  username: 'admin',
  password: '123456'
}

const FORM_RULES: Record<string, FormRule[]> = {
  username: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  verifyCode: [
    { required: true, message: '验证码必填', type: 'error' },
    {
      validator: validateCode,
      message: '请输入正确格式的验证码',
      type: 'error',
      trigger: 'blur'
    }
  ]
}

const type = ref(2)

const form = ref<FormInstanceFunctions>()
const formData = ref({ ...INITIAL_DATA })
const showPsw = ref(false)

const router = useRouter()
const route = useRoute()

const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    loadSt.value = true
    // 登录相关
    userLogins(formData.value).then(async (res) => {
      if (res.code === 200) {
        // 用户token写入 pinia
        await userStore.login(res.data)
        // 获取用户信息 并存入pinia
        const { data } = await getUserInfo()
        userStore.setUserInfo(data)
        loadSt.value = false
        // 登录成功， 转入首页
        MessagePlugin.success('登录成功')
        const redirect = route.query.redirect as string
        const redirectUrl = redirect
          ? decodeURIComponent(redirect)
          : '/dashboard'
        router.push(redirectUrl)
      } else {
        MessagePlugin.success(res.msg)
      }
    })
  }
}

const formataccount = (val: string) => {
  return val.replace(/\s/g, '')
}
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
