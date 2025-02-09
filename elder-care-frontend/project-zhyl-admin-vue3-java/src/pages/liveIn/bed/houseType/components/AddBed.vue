<!-- 床位新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '床位'"
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
            <t-form-item label="床位号：" name="bedNumber">
              <t-input
                v-model="formData.bedNumber"
                class="wt-400"
                placeholder="请输入"
                clearable
                show-limit-number
                :maxlength="10"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="排序：" name="sort">
              <t-input-number
                v-model="formData.sort"
                :min="minNumber"
                :decimal-places="0"
                @blur="textBlurNo"
                @change="textBlurNo"
              ></t-input-number>
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
  // 最新值
  minNumber: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: ''
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'fetchData',
  'handleAdd',
  'handleEdit'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
const isChick = ref(false) // 防止连续点击提交按钮
// 表单数据
const formData = ref<Object | any>({
  bedNumber: '',
  sort: 1
})
// 表单校验
const rules = {
  bedNumber: [
    {
      required: true,
      message: '床位号为空，请输入床位号',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 弹窗标题
const title = ref()
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    title.value = props.title
  }
)
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.data,
  (val) => {
    if (val.id) {
      formData.value.id = val.id
    }

    formData.value.bedNumber = val.bedNumber
    formData.value.sort = val.sort
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (!isChick.value) {
      isChick.value = true
      if (props.title === '新增') {
        // 调用新增接口
        emit('handleAdd', formData.value)
      } else {
        // 调用编辑接口
        emit('handleEdit', formData.value)
      }
      setTimeout(() => {
        isChick.value = false
        clearTimeout()
      }, 3000)
    }
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.sort = 1
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 监听排序
const textBlurNo = () => {
  const data = formData.value.sort
  if (data <= 1) {
    formData.value.sort = 1
  }
}
// 传递给父组件的方法
defineExpose({
  handleClear
})
</script>
