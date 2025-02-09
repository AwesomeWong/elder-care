<!-- 到院弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="来访登记"
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
            :label-width="110"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="来访类型：" name="type">
              <t-radio-group v-model="formData.type" @change="handleRadio">
                <t-radio
                  v-for="(item, index) in appTypeData"
                  :key="index"
                  :value="item.id"
                  >{{ item.name }}</t-radio
                >
              </t-radio-group>
            </t-form-item>
            <t-form-item label="来访人姓名：" name="name">
              <t-input
                v-model="formData.name"
                class="wt-400"
                placeholder="请输入"
                clearable
                :maxlength="10"
                show-limit-number
              >
              </t-input>
            </t-form-item>
            <t-form-item label="来访人手机号：" name="mobile">
              <t-input
                v-model="formData.mobile"
                class="wt-400"
                placeholder="请输入"
                clearable
                :maxlength="11"
                show-limit-number
              >
              </t-input>
            </t-form-item>
            <t-form-item
              v-if="formData.type === 0"
              label="老人姓名："
              name="visitor"
            >
              <t-input
                v-model="formData.visitor"
                class="wt-400"
                placeholder="请输入"
                clearable
                :maxlength="10"
                show-limit-number
              >
              </t-input>
            </t-form-item>
            <t-form-item v-else label="老人姓名：" name="visitorId">
              <t-select
                v-model="formData.visitorId"
                clearable
                filterable
                placeholder="请选择"
              >
                <t-option
                  v-for="(item, index) in oldManData"
                  :key="index"
                  :value="item.name"
                  :label="item.name"
                  title=""
                ></t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="来访时间：" name="time">
              <t-date-picker
                v-model="formData.time"
                placeholder="请选择"
                enable-time-picker
              />
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
import { getTateDt } from '@/utils/date'
// 接口

// 基础数据
import { appTypeData } from '@/utils/commonData'
// 校验
import { validatePhone } from '@/utils/validate'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  oldManData: {
    type: Array<Object | any>,
    default: () => {
      return []
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'handleSubmit'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  type: 0,
  time: new Date()
})
// 表单校验
const rules = {
  type: [
    // 来访类型校验
    {
      required: true,
      message: '来访类型为空，请输入来访类型',
      type: 'error',
      trigger: 'change'
    }
  ],
  name: [
    // 来访人姓名校验
    {
      required: true,
      message: '来访人姓名为空，请输入来访人姓名',
      type: 'error',
      trigger: 'blur'
    }
  ],
  mobile: [
    // 来访人手机号校验
    {
      required: true,
      message: '来访人手机号为空，请输入来访人手机号',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '手机号格式错误，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  visitor: [
    // 老人姓名校验
    {
      required: true,
      message: '老人姓名为空，请输入老人姓名',
      type: 'error',
      trigger: 'blur'
    }
  ],
  visitorId: [
    {
      required: true,
      message: '老人姓名为空，请选择老人姓名',
      type: 'error',
      trigger: 'change'
    }
  ],
  time: [
    // 来访时间校验
    {
      required: true,
      message: '来访时间为空，请输入来访时间',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  (val) => {
    formVisible.value = props.visible
    if (val) {
      formData.value.time = new Date()
    }
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (formData.value.visitorId) {
      formData.value.visitor = formData.value.visitorId
    }
    formData.value.time = getTateDt(formData.value.time)
    emit('handleSubmit', formData.value)
  }
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.visitorId = ''
  formData.value.visitor = ''
  formData.value.type = 0
}
//
const handleRadio = (val) => {
  formData.value = {}
  formData.value.type = val
  formData.value.time = new Date()
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
