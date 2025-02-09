<!-- 安排护理员弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="设置护理员"
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
            :label-width="90"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="护理员姓名：" name="bedNumber">
              <t-select
                v-model="formData.bedNumber"
                class="wt-400"
                placeholder="请输入"
                clearable
                filterable
                multiple
                :max="4"
                @change="handleChange"
              >
                <t-option
                  v-for="(item, index) in data"
                  :key="index"
                  :value="item.id"
                  :label="item.realName"
                  title=""
                >
                  {{ item.realName }}
                </t-option>
              </t-select>
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
  //   详情数据
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  //   设置单个老人护理员的数据
  singleNurse: {
    type: Object,
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
const formData = ref<Object | any>({})
// 表单校验
const rules = {
  bedNumber: [
    {
      required: true,
      message: '护理员为空，请选择护理员',
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
    formData.value.bedNumber = props.singleNurse
    console.log(props.singleNurse, 'val')
  }
)

// 定义方法
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleSubmit', formData.value.bedNumber)
    // form.value.clearValidate()
  }
}
const handleChange = (val) => {
  formData.value.bedNumber = val
  console.log(val, '-----------')
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
// 传递给父组件的方法
defineExpose({
  handleClear
})
</script>
