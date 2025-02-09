<!-- 新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <t-form
          ref="form"
          :data="formData"
          :rules="rules"
          :label-width="80"
          on-cancel="onClickCloseBtn"
          :reset-type="resetType"
          @submit="onSubmit"
        >
          <t-form-item label="调用次数：" name="serviceCallNumber">
            <t-input
              v-model="formData.serviceCallNumber"
              class="wt-400"
              placeholder="请输入"
              clearable
            >
              <template #suffix>
                <span class="company">次</span>
              </template>
            </t-input>
          </t-form-item>
          <t-form-item label="产品描述：" name="description"
            ><t-textarea
              v-model="formData.description"
              class="wt-400"
              placeholder="请输入至少5个字符"
              :maxlength="50"
            >
            </t-textarea>
          </t-form-item>
          <t-form-item style="float: right">
            <div class="bt bt-grey btn-submit" @click="onClickCloseBtn">
              <span>取消</span>
            </div>
            <button theme="primary" type="submit" class="bt btn-submit">
              <span>确定</span>
            </button>
          </t-form-item>
        </t-form>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
import { validateNum, validateText } from '@/utils/validate'
// 重置
const resetType = ref('empty')
// 表单内容
const form = ref()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '新建产品'
  }
})
// 触发父组件事件
const emit: Function = defineEmits(['handleClose', 'fetchData'])
// 控制显示隐藏
const formVisible = ref(false)
// 表单数据
const formData = ref({
  serviceCallNumber: '',
  description: ''
})
// 表单标题
const title = ref()
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    // 判断内容时否发生改变
    // if (
    //   formData.value.serviceCallNumber === props.data.serviceCallNumber &&
    //   formData.value.description === props.data.description
    // ) {
    //   MessagePlugin.warning('内容未发生改变')
    // } else {
    MessagePlugin.success('提交成功')
    emit('fetchData')
    onClickCloseBtn()
  }
}
// 关闭弹窗
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formVisible.value = false
  emit('handleClose')
}
// 点击叉号关闭

watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    title.value = props.title
  }
)

watch(
  () => props.data,
  (val) => {
    formData.value = JSON.parse(JSON.stringify(val))
  }
)
// 表单校验
const rules = {
  serviceCallNumber: [
    // 调用次数校验
    {
      required: true,
      message: '请输入调用次数',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateNum,
      message: '请输入正确格式的调用次数，0-999',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: validateNum,
      message: '请输入正确格式的调用次数，0-999',
      type: 'error',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入产品描述',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateText,
      message: '请输入至少5个字符,至多50个字符',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: validateText,
      message: '请输入至少5个字符,至多50个字符',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
</script>
<style lang="less" scoped>
.btn-submit {
  margin-left: 15.5px;
  width: 60px;
}

.nickname {
  margin-right: 2px;
  z-index: 100;
  color: var(--color-bk4);
}
:deep(.t-textarea__limit) {
  color: var(--color-bk4);
  right: 10px;
}
</style>
