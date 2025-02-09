<!-- 解除合同 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-form ref="form" :data="formData" :rules="rules" :label-width="88">
      <t-card title="上传解除协议">
        <t-form-item label="合同编号：">{{
          baseData.retreat.contractNo
        }}</t-form-item>
        <t-form-item label="解除日期：" class="label-wt" name="time">
          <t-date-picker
            v-model="formData.time"
            placeholder="请选择"
            class="wt-300"
          />
        </t-form-item>
        <t-form-item label="解除协议：" name="contractUrl">
          <t-upload
            ref="uploadRef"
            v-model="uploadFile"
            action="api/common/upload"
            :autoUpload="autoUpload"
            :size-limit="sizeLimit"
            tips="请上传pdf文件，大小在60M以内"
            accept=".pdf"
            @remove="remove"
            @fail="handleFail"
            @success="handleSuccess"
            @validate="onValidate"
          ></t-upload>
        </t-form-item>
      </t-card>
    </t-form>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 获取父组件值、方法
const props = defineProps({
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['getVallidate'])
const form = ref() // 表单
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const uploadFile = ref([]) // 绑定上传的文件
const sizeLimit = ref({
  size: 60,
  unit: 'MB',
  message: '图片大小超过60m，请重新上传'
}) // 图片的大小限制

// 表单数据
const formData = ref<Object | any>({
  time: new Date()
})
// 表单校验
const rules = {
  time: [
    {
      required: true,
      message: '解除日期为空，请选择解除日期',
      type: 'error',
      trigger: 'change'
    }
  ],
  contractUrl: [
    {
      required: true,
      message: '解除协议为空，请上传解除协议',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// -----定义方法------
watch(formData.value, (val) => {
  if (val.time && uploadFile.value.length > 0) {
    emit('getVallidate', false)
  }
})
// 移除图片时将图片设置为默认图片
const remove = () => {
  uploadFile.value = []
  formData.value.contractUrl = ''
}
// 上传图片失败
const handleFail = () => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const contractUrl = params.response.data
  formData.value.contractUrl = contractUrl
  uploadFile.value[0].response.url = contractUrl
  uploadFile.value[0].url = contractUrl
}
// 超过2m或者文件格式错误报错提示
const onValidate = (params) => {
  const { files, type } = params
  const messageMap = {
    FILE_OVER_SIZE_LIMIT: files[0].response.error,
    FILES_OVER_LENGTH_LIMIT: '文件数量超出限制，仅上传未超出数量的文件',
    FILTER_FILE_SAME_NAME: '不允许上传同名文件',
    BEFORE_ALL_FILES_UPLOAD: 'beforeAllFilesUpload 方法拦截了文件',
    CUSTOM_BEFORE_UPLOAD: 'beforeUpload 方法拦截了文件'
  }
  messageMap[type] && MessagePlugin.warning(messageMap[type])
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  formData.value.checkOutTime = new Date()
}
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData,
  handleClear
})
</script>
