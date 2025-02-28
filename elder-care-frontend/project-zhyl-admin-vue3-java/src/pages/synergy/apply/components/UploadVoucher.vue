<!-- 上传退款凭证弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="上传退款凭证"
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
            <t-form-item label="退款方式：" name="tradingChannel">
              <t-select
                v-model="formData.tradingChannel"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
              >
                <t-option
                  v-for="(item, index) in refundModeData"
                  :key="index"
                  :value="item.value"
                  :label="item.value"
                  title=""
                >
                  {{ item.value }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="退款凭证：" name="refundVoucherUrl">
              <t-upload
                ref="uploadRef"
                v-model="photoFile"
                action="api/common/upload"
                :autoUpload="autoUpload"
                theme="image"
                :size-limit="sizeLimit"
                tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
                accept="image/*"
                :before-upload="beforeUpload"
                @remove="remove"
                @fail="handleFail"
                @success="handleSuccess"
              ></t-upload>
            </t-form-item>
            <t-form-item label="退款备注：" name="remark"
              ><t-textarea
                v-model="formData.remark"
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
import { MessagePlugin, ValidateResultContext } from 'tdesign-vue-next'
// 基础数据
import { refundModeData } from '@/utils/commonData'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'handleUpload',
  'handleEditForm'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({})
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const photoFile = ref([]) // 绑定上传的文件
const sizeLimit = ref({
  size: 2,
  unit: 'MB',
  message: '图片大小超过2m，请重新上传'
}) // 图片的大小限制
// 表单校验
const rules = {
  tradingChannel: [
    {
      required: true,
      message: '退款方式为空，请输入退款方式',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   图片
  refundVoucherUrl: [
    {
      required: true,
      message: '退款凭证为空，请上传退款凭证',
      type: 'error',
      trigger: 'change'
    }
  ],
  remark: [
    {
      required: true,
      message: '退款备注为空，请输入退款备注',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  () => {
    formVisible.value = props.visible
    const val = props.data
    if (val.refundVoucherUrl) {
      formData.value = val
      photoFile.value = []
      const obj = {
        url: val.refundVoucherUrl
      }
      photoFile.value.push(obj)
    }
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleUpload', formData.value)
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  photoFile.value = []
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 移除图片时将图片设置为默认图片
const remove = () => {
  photoFile.value = []
  formData.value.refundVoucherUrl = ''
}
// 上传图片失败
const handleFail = () => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const photo = params.response.data
  formData.value.refundVoucherUrl = photo
  photoFile.value[0].response.url = photo
  photoFile.value[0].url = photo
}
// 限制图片的大小
const beforeUpload = (file) => {
  if (file.size > 2 * 1024 * 1024) {
    MessagePlugin.error('图片大小超过2M，请重新上传')
    return false
  }
  return true
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
