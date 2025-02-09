<!-- 签约办理表单 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-form ref="form" :data="formData" :rules="rules" :label-width="108">
      <t-card title="完成签约办理">
        <div class="contractTit titIcon">
          <span
            >签约信息
            <t-popup
              class="placement bottom center titTpopup"
              content=""
              placement="bottom"
              show-arrow
              destroy-on-close
            >
              <t-icon name="error-circle-filled"></t-icon>
              <template #content>
                完成合同签约后，系统将会生成首期账单。生成账单后，入住配置和签约办理信息将无法修改，若修改信息，需办理退住流程。
              </template>
            </t-popup>
          </span>
        </div>
        <t-form-item label="合同编号：" class="lastText">{{
          formData.contractNo
        }}</t-form-item>
        <t-form-item label="合同名称：" name="name" class="lastText">
          <t-input
            v-model="formData.name"
            placeholder="请输入"
            class="wt-300"
            clearable
            show-limit-number
            :maxlength="20"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="合同期限：" class="lastText">
          {{ getDateInfo(formData.startTime) }}
          ——
          {{ getDateInfo(formData.endTime) }}
        </t-form-item>

        <t-form-item label="签约日期：" class="lastText" name="signDate">
          <t-date-picker
            v-model="formData.signDate"
            placeholder="请选择"
            class="wt-300"
            clearable
          />
        </t-form-item>
        <t-form-item label="丙方姓名：" name="memberName" class="lastText">
          <t-input
            v-model="formData.memberName"
            placeholder="请输入"
            class="wt-300"
            show-limit-number
            clearable
            :maxlength="10"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="丙方联系方式：" name="memberPhone" class="lastText">
          <t-input
            v-model="formData.memberPhone"
            placeholder="请输入"
            class="wt-300"
            clearable
            show-limit-number
            :maxlength="11"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="上传合同：" name="pdfUrl" class="lastText">
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
          ></t-upload>
        </t-form-item>
      </t-card>
    </t-form>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getDateInfo } from '@/utils/date'
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
  signDate: new Date()
})
// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '合同名称为空，请输入合同名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  signDate: [
    {
      required: true,
      message: '签约日期为空，请选择签约日期',
      type: 'error',
      trigger: 'change'
    }
  ],
  pdfUrl: [
    {
      required: true,
      message: '上传合同为空，请选择上传合同',
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
onMounted(() => {
  if (props.baseData.retreat !== undefined) {
    formData.value.contractNo = props.baseData.retreat.remark
    formData.value.startTime =
      props.baseData.retreat.checkInConfigVo.checkInStartTime
    formData.value.endTime =
      props.baseData.retreat.checkInConfigVo.checkInEndTime
  }
})
// 移除图片时将图片设置为默认图片
const remove = () => {
  uploadFile.value = []
  formData.value.pdfUrl = ''
}
// 上传图片失败
const handleFail = (file) => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const pdfUrl = params.response.data
  formData.value.pdfUrl = pdfUrl
  uploadFile.value[0].response.url = pdfUrl
  uploadFile.value[0].url = pdfUrl
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
