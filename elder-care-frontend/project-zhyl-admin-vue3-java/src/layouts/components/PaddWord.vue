<!-- 修改密码弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="修改密码"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <div class="dialogCenter">
          <t-form
            ref="form"
            :data="formData"
            :rules="rules"
            :label-width="94"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="handleOpen"
          >
            <t-form-item label="原密码：" name="oldPassword">
              <t-input
                v-model="formData.oldPassword"
                class="wt-400"
                placeholder="请输入"
                type="password"
                clearable
                :maxlength="20"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="新密码：" name="newPassword">
              <t-input
                v-model="formData.newPassword"
                class="wt-400"
                placeholder="请输入"
                type="password"
                clearable
                :maxlength="20"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="确认新密码：" name="verifyPassword">
              <t-input
                v-model="formData.verifyPassword"
                class="wt-400"
                placeholder="请输入"
                type="password"
                clearable
                :maxlength="20"
              >
              </t-input>
            </t-form-item>
            <t-form-item class="dialog-footer">
              <div>
                <button class="bt bt-grey wt-60" type="reset">取消</button>
                <button theme="primary" type="submit" class="bt wt-60">
                  <span>确定</span>
                </button>
              </div>
            </t-form-item>
          </t-form>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ValidateResultContext } from 'tdesign-vue-next'
import { validatePwd } from '@/api/user'
import {
  validatePasswordL,
  validatePasswordN,
  validatePasswordLc,
  validatePasswordUc
} from '@/utils/validate'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'handleOpen'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({})
// 校验两次输入的密码是否一致
const validatePassword = (val) => {
  if (formData.value.newPassword !== val) {
    return false
  }
  return true
}
// 新密码和原密码是否一直
const validatePasswordNew = (val) => {
  if (formData.value.oldPassword === val) {
    return false
  }
  return true
}
// 新密码和原密码是否一直
const validateOldPwd = async (val) => {
  if (val) {
    const res: any = await validatePwd({ oldPw: val })
    if (res.code === 200) {
      return true
    }
    return false
  }
  return false
}
// 表单校验
const rules = {
  oldPassword: [
    {
      required: true,
      message: '原密码为空，请输入原密码',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateOldPwd,
      message: '原密码不正确，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      message: '新密码为空，请输入新密码',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordL,
      message: '密码长度显示8-20位，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordN,
      message: '必须包含数字，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordLc,
      message: '必须包含小写字母，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordUc,
      message: '必须包含大写字母，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordNew,
      message: '新密码不能与原密码一致，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  verifyPassword: [
    {
      required: true,
      message: '确认新密码为空，请输入确认新密码',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePasswordNew,
      message: '新密码不能与原密码一致，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePassword,
      message: '新密码与确认新密码不一致，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
  }
)
// -----定义方法------
// 提交表单
const handleOpen = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleOpen')
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear,
  formData
})
</script>
