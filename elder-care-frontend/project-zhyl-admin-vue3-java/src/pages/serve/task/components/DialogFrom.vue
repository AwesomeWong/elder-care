<!-- 取消原因弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="pageTitle"
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
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="取消原因：" name="reason"
              ><t-textarea
                v-model="formData.reason"
                class="wt-400"
                placeholder="请输入"
                :maxlength="100"
              >
              </t-textarea>
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
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: '新增'
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'handleEditForm'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  reason: ''
})

// 表单校验
const rules = {
  //   取消说明校验
  reason: [
    {
      required: true,
      message: '取消原因为空，请输入取消原因',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 弹窗标题
const pageTitle = ref()
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    pageTitle.value = props.title
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleEditForm', formData.value)
    handleClear()
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
defineExpose({
  handleClear
})
</script>
