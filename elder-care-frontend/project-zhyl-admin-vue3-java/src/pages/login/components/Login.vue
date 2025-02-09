<!-- 用户名密码登录 -->
<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="formRules"
    label-width="0"
    @submit="onSubmit"
  >
    <!-- 密码登录 -->
    <template v-if="type == 2">
      <t-form-item name="username">
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
        <t-checkbox v-model="checkbox" @change="handleChange"
          >自动登录</t-checkbox
        >
      </div>
    </template>

    <t-form-item class="btn-container">
      <t-loading v-if="loadSt" indicator class="bt load"></t-loading>
      <button v-else class="bt" type="submit">登录</button>
    </t-form-item>
    <div class="gentleReminder">
      仅用于IT培训教学使用，为保障您的个人信息安全，请勿向
      平台录入任何个人敏感信息(如手机号、身份证号等) !
    </div>
  </t-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next'
import { useUserStore, usePermissionStore } from '@/store'
import { userLogins, getRuterInfo, getRuterButton } from '@/api/user'

// tab切换数据
const userStore = useUserStore()
const permissionStore = usePermissionStore()
// 登录loadding
const loadSt = ref(false)
// 登录基础设置
const formData = ref({
  // asdasdsa@qq.com
  // fyz@qq.com
  username: 'admin@qq.com',
  password: '888itcast.CN764%...'
})
// 表单校验
const formRules: Record<string, FormRule[]> = {
  username: [
    { required: true, message: '账号为空，请重新输入', type: 'error' }
  ],
  password: [{ required: true, message: '密码为空，请重新输入', type: 'error' }]
}

const type = ref(2)

const form = ref<FormInstanceFunctions>()

const showPsw = ref(false)
const router = useRouter()
const route = useRoute()
const checkbox = ref(false)
const userBase = ref(JSON.parse(localStorage.getItem('userdata')))
onMounted(() => {
  if (userBase.value) {
    checkbox.value = userBase.value.checkbox
    formData.value.username = userBase.value.username
    formData.value.password = userBase.value.password
  }
})
const onSubmit = async ({ validateResult }) => {
  // 存登录信息，方便自动登录
  const data = {
    ...formData.value,
    checkbox: checkbox.value
  }
  if (checkbox.value) {
    localStorage.setItem('userdata', JSON.stringify(data))
  } else {
    localStorage.removeItem('userdata')
  }
  if (validateResult === true) {
    loadSt.value = true
    // 登录相关
    await userLogins(formData.value).then(async (res: any) => {
      if (res.code === 200) {
        // 用户token写入 pinia
        await userStore.login(res.data.userToken)
        userStore.setUserInfo(res.data)
        loadSt.value = false
        // 获取路由权限信息
        await getRuterInfo().then(async (res) => {
          if (res.code === 200) {
            if (!res.data.length)
              MessagePlugin.error('未配置菜单权限，请联系管理员')
            // 动态路由存入
            await permissionStore.setRouters(res.data)
            const redirect = route.query.redirect as string
            const redirectUrl = redirect
              ? decodeURIComponent(redirect)
              : res.data && res.data.length && res.data[0].path
            router.push(redirectUrl)
            // 获取按钮权限信息
            await getRuterButton().then(async (res) => {
              await userStore.setRouteButton(res.data)
            })
            // 登录成功， 转入首页
            MessagePlugin.success('登录成功')
          }
        })
      }
    })
    setTimeout(() => {
      loadSt.value = false
    }, 1000)
  }
}
// 触发自动登录
const handleChange = (e) => {
  if (!e) {
    const data = {
      ...formData.value,
      checkbox: e
    }
    localStorage.setItem('userdata', JSON.stringify(data))
  }
}
const formataccount = (val: string) => {
  return val.replace(/\s/g, '')
}
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
