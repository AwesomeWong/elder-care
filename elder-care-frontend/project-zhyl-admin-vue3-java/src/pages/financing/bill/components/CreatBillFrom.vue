<!-- 生成月度账单弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="生成月度账单"
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
            :label-width="85"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="老人姓名：" name="elderId">
              <t-select
                v-model="formData.elderId"
                clearable
                filterable
                placeholder="请选择"
                class="wt-400"
              >
                <t-option
                  v-for="(item, index) in oldManData"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                >
                  {{ item.name }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="账单月份：" name="billMonth"
              ><t-date-picker
                v-model="formData.billMonth"
                :disable-date="{ before: dayjs().subtract(1, 'day').format() }"
                mode="month"
                clearable
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
import dayjs from 'dayjs'
import { addZero } from '@/utils/date'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  // 老人数据
  oldManData: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'handleSub'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({})

// 表单校验
const rules = {
  elderId: [
    {
      required: true,
      message: '老人姓名为空，请选择老人姓名',
      type: 'error',
      trigger: 'change'
    }
  ],
  billMonth: [
    {
      required: true,
      message: '账单月份为空，请选择账单月份',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 2
    formData.value.billMonth = `${year}-${addZero(month)}`
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleSub', formData.value)
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
  handleClear
})
</script>
