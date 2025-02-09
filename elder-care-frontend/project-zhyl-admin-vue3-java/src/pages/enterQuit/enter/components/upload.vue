<!-- 资料上传 -->
<template>
  <div class="dialog-form checkUpload">
    <!-- 基本信息 -->
    <t-form ref="form" :data="formData" :rules="rules" :label-width="110">
      <t-form-item label="一寸照片：" name="url1">
        <t-upload
          ref="uploadRef"
          v-model="uploadFile1"
          action="api/common/upload"
          :autoUpload="autoUpload"
          theme="image"
          :size-limit="sizeLimit"
          tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
          accept=".jpg,.jpeg,.png"
          :before-upload="beforeUpload"
          @remove="remove(1)"
          @fail="handleFail"
          @success="handleSuccess($event, 1)"
        ></t-upload>
      </t-form-item>
      <t-form-item label="身份证人像面：" name="url2">
        <t-upload
          ref="uploadRef"
          v-model="uploadFile2"
          action="api/common/upload"
          :autoUpload="autoUpload"
          theme="image"
          :size-limit="sizeLimit"
          tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
          accept=".jpg,.jpeg,.png"
          :before-upload="beforeUpload"
          @remove="remove(2)"
          @fail="handleFail"
          @success="handleSuccess($event, 2)"
        ></t-upload>
      </t-form-item>
      <t-form-item label="身份证国徽面：" name="url3">
        <t-upload
          ref="uploadRef"
          v-model="uploadFile3"
          action="api/common/upload"
          :autoUpload="autoUpload"
          theme="image"
          :size-limit="sizeLimit"
          tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
          accept=".jpg,.jpeg,.png"
          :before-upload="beforeUpload"
          @remove="remove(3)"
          @fail="handleFail"
          @success="handleSuccess($event, 3)"
        ></t-upload>
      </t-form-item>
    </t-form>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 获取父组件值、方法
const props = defineProps({
  urls: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const form = ref() // 表单
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const uploadFile1 = ref([]) // 绑定上传的文件
const uploadFile2 = ref([]) // 绑定上传的文件
const uploadFile3 = ref([]) // 绑定上传的文件
const sizeLimit = ref({
  size: 60,
  unit: 'MB',
  message: '图片大小超过60m，请重新上传'
}) // 图片的大小限制

// 表单数据
const formData = ref<Object | any>({})
// 表单校验
const rules = {
  url1: [
    {
      required: true,
      message: '一寸照片为空，请上传一寸照片',
      type: 'error',
      trigger: 'change'
    }
  ],
  url2: [
    {
      required: true,
      message: '身份证人像面为空，请上传身份证人像面',
      type: 'error',
      trigger: 'change'
    }
  ],
  url3: [
    {
      required: true,
      message: '身份证国徽面为空，请上传身份证国徽面',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// -----定义方法------
onMounted(() => {
  const val = props.urls
  if (val.url1 !== undefined) {
    const obj1 = {
      url: val.url1
    }
    formData.value.url1 = val.url1
    formData.value.url2 = val.url2
    formData.value.url3 = val.url3
    const obj2 = {
      url: val.url2
    }
    const obj3 = {
      url: val.url3
    }
    uploadFile1.value.push(obj1)
    uploadFile2.value.push(obj2)
    uploadFile3.value.push(obj3)
  }
})
// 移除图片时将图片设置为默认图片
const remove = (val) => {
  if (val === 1) {
    uploadFile1.value = []
    formData.value.url1 = ''
  } else if (val === 2) {
    uploadFile2.value = []
    formData.value.url2 = ''
  } else {
    uploadFile3.value = []
    formData.value.url3 = ''
  }
}
// 上传图片失败
const handleFail = (file) => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params, val) => {
  if (val === 1) {
    const url1 = params.response.data
    formData.value.url1 = url1
    uploadFile1.value[0].response.url = url1
    uploadFile1.value[0].url = url1
  } else if (val === 2) {
    const url2 = params.response.data
    formData.value.url2 = url2
    uploadFile2.value[0].response.url = url2
    uploadFile2.value[0].url = url2
  } else {
    const url3 = params.response.data
    formData.value.url3 = url3
    uploadFile3.value[0].response.url = url3
    uploadFile3.value[0].url = url3
  }
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
  form,
  formData
})
</script>
