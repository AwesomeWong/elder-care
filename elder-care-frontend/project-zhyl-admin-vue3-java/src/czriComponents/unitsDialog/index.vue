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
          <t-form-item label="手机号：" name="phoneNumber">
            <t-input
              v-model="formData.phoneNumber"
              class="wt-400"
              placeholder="请输入"
              clearable
            />
          </t-form-item>
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
          <t-form-item label="昵称：" name="name">
            <t-input
              v-model="formData.name"
              class="wt-400"
              placeholder="请输入"
              clearable
              @change="Wordlimit(10)"
            >
              <template #suffix>
                <span class="nickname">
                  <span>{{ formData.name ? formData.name.length : 0 }}</span
                  >/10</span
                >
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
import {
  validateNum,
  validateText,
  validateText10,
  validatePhone
} from '@/utils/validate'

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
const resetType = ref('empty')
const form = ref()
const emit: Function = defineEmits(['handleClose', 'fetchData'])
const formVisible = ref(false)
const formData = ref(props.data)
const title = ref()

const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    MessagePlugin.success('提交成功')
    onClickCloseBtn()
    emit('fetchData')
  }
}
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
    formData.value = val
  }
)

// 字数限制
const Wordlimit: Function = (num: number) => {
  if (formData.value.name.length > num) {
    formData.value.name = formData.value.name.slice(0, num)
  }
}
// 表单校验
const rules = {
  phoneNumber: [
    // 手机号校验
    {
      required: true,
      message: '请输入手机号',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '请输入正确格式的手机号',
      type: 'error',
      trigger: 'blur'
    }
  ],
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
  name: [
    // 昵称校验
    {
      required: true,
      message: '请输入昵称',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateText10,
      message: '请输入至少2个字符,至多10个字符',
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
.t-dialog__ctx
  .t-dialog
  .t-form:not(.t-form-inline)
  .t-form__item:last-of-type {
  right: -165px;
}
</style>
