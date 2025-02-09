<!-- 到院弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="确认到院时间"
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
            :label-width="80"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @submit="onSubmit"
          >
            <t-form-item label="来访时间：" name="pickDate">
              <t-date-picker
                v-model="formData.pickDate"
                placeholder="请选择"
                enable-time-picker
                @change="handleChange"
              />
            </t-form-item>
            <t-form-item class="dialog-footer">
              <div>
                <button
                  class="bt bt-grey wt-60"
                  type="reset"
                  @click="onClickCloseBtn"
                >
                  取消
                </button>
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
const emit: Function = defineEmits(['handleClose', 'handleSubmit'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  pickDate: new Date()
})
const pickDate = ref()
// 表单校验
const rules = {
  pickDate: [
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
    // 重置来访默认时间
    if (val) {
      formData.value.pickDate = new Date()
    }
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    let time = null
    // 把时间转为时间戳
    if (pickDate.value === undefined) {
      time = new Date(formData.value.pickDate).getTime()
    } else {
      time = new Date(pickDate.value).getTime()
    }
    emit('handleSubmit', time)
    onClickCloseBtn()
  }
}
// 获取来访时间
const handleChange = (date) => {
  pickDate.value = date
}
// 点击取消关闭
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  emit('handleClose')
}
</script>
