<!-- 等级新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '护理等级'"
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
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="护理等级名称：" name="name">
              <t-input
                v-model="formData.name"
                class="wt-400"
                placeholder="请输入"
                clearable
                show-limit-number
                :maxlength="10"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="执行护理计划：" name="planId">
              <t-select
                v-model="formData.planId"
                clearable
                filterable
                placeholder="请选择"
              >
                <t-option
                  v-for="(item, index) in planData"
                  :key="index"
                  :value="item.id"
                  :label="item.planName"
                  title=""
                ></t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="护理费用：" name="fee">
              <t-input-number
                v-model="formData.fee"
                :min="0"
                :step="10"
                placeholder="0.00"
                :decimal-places="2"
                @blur="textBlurPrice"
                @change="textBlurPrice"
              ></t-input-number>
            </t-form-item>
            <t-form-item label="状态：" name="status">
              <t-radio-group v-model="formData.status">
                <t-radio
                  v-for="(item, index) in statusData"
                  :key="index"
                  :value="item.id"
                  >{{ item.value }}</t-radio
                >
              </t-radio-group>
            </t-form-item>
            <t-form-item label="等级说明：" name="description"
              ><t-textarea
                v-model="formData.description"
                class="wt-400"
                placeholder="请输入"
                :maxlength="50"
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
// 基础数据
import { statusData } from '@/utils/commonData'
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
  // 标题
  title: {
    type: String,
    default: '新增'
  },
  //   护理计划
  planData: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'fetchData',
  'handleAdd',
  'handleEditForm'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  status: 1,
  free: 0
})

// 表单校验
const rules = {
  name: [
    // 护理等级名称校验
    {
      required: true,
      message: '护理等级名称为空，请输入护理等级名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  planId: [
    // 执行护理计划校验
    {
      required: true,
      message: '执行护理计划为空，请选择执行护理计划',
      type: 'error',
      trigger: 'change'
    }
  ],
  fee: [
    // 护理费用校验
    {
      required: true,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   状态
  status: [
    {
      required: true,
      message: '状态为空，请选择状态',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   等级说明校验
  description: [
    {
      required: true,
      message: '等级说明为空，请输入等级说明',
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
    formData.value = val
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    if (props.title === '新增') {
      // 调用新增接口
      emit('handleAdd', formData.value)
    } else {
      // 调用编辑接口
      emit('handleEditForm', formData.value)
    }
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.status = 1
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// // 监听费用
const textBlurPrice = () => {
  const data = Number(formData.value.fee)
  minNum(data)
}
// 当前输入的金额小于0的时候显示0.00
const minNum = (val) => {
  if (val < 0) {
    formData.value.fee = '0.00'
  }
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
