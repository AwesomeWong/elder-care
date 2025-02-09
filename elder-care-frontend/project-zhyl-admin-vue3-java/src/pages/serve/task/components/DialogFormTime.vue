<!-- 修改执行时间弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="修改执行时间"
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
            :label-width="108"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @submit="onSubmit"
          >
            <t-form-item label="期望服务时间：" name="estimatedServerTime">
              <t-date-picker
                v-model="formData.estimatedServerTime"
                placeholder="请选择"
                enable-time-picker
                class="expectTime wt-400"
                :disable-date="{ before: new Date() }"
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
  },
  timeData: {
    type: String
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
  estimatedServerTime: ''
})
// 表单校验
const rules = {
  estimatedServerTime: [
    // 来访时间校验
    {
      required: true,
      message: '期望服务时间为空，请输入期望服务时间',
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
      formData.value.estimatedServerTime = props.timeData
    }
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    let time = null
    if (formData.value.estimatedServerTime === undefined) {
      // tdesign的日期选择有bug，选择的时间和实际组件抛出的时间相差8个小时
      time = new Date(formData.value.estimatedServerTime).getTime()
    } else {
      time = new Date(formData.value.estimatedServerTime).getTime()
    }
    emit('handleSubmit', { estimatedServerTime: time })
    onClickCloseBtn()
  }
}
const handleChange = (date) => {
  console.log(date, 'date')
}
// 点击取消关闭
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  emit('handleClose')
}
</script>
<style lang="less" scoped>
.t-popup {
  width: auto;
}
</style>
