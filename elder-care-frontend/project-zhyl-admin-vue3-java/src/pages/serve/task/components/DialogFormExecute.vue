<!-- 执行记录弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      header="新增执行记录"
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
            @submit="onSubmit"
          >
            <t-form-item label="执行时间：" name="estimatedServerTime">
              <t-date-picker
                v-model="formData.estimatedServerTime"
                placeholder="请选择"
                enable-time-picker
                class="expectTime"
                @change="handleChange"
              />
            </t-form-item>
            <t-form-item label="执行图片：" name="taskImage">
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
            <t-form-item label="执行记录：" name="mark"
              ><t-textarea
                v-model="formData.mark"
                class="wt-400"
                placeholder="请输入"
                :maxlength="100"
              >
              </t-textarea>
            </t-form-item>
            <t-form-item class="dialog-footer">
              <div>
                <button
                  class="bt bt-grey wt-60"
                  type="reset"
                  @click="onClickCloseBtn"
                >
                  取消
                </button>
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
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits(['handleClose', 'handleSubmit'])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  estimatedServerTime: '',
  mark: ''
})
const autoUpload = ref(true) // 是否在选择文件后自动发起请求上传文件
const photoFile = ref([]) // 绑定上传的文件
const sizeLimit = ref({
  size: 2,
  unit: 'MB',
  message: '图片大小超过2m，请重新上传'
}) // 图片的大小限制
// 表单校验
const rules = {
  estimatedServerTime: [
    // 房型类型校验
    {
      required: true,
      message: '执行时间为空，请选择执行时间',
      type: 'error',
      trigger: 'blur'
    }
  ],
  //   图片
  taskImage: [
    {
      required: true,
      message: '执行图片为空，请上传执行图片',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   介绍
  mark: [
    {
      required: true,
      message: '执行记录为空，请输入执行记录',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  (val) => {
    formVisible.value = props.visible
    if (val) {
      formData.value.estimatedServerTime = new Date().getTime()
    }
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    emit('handleSubmit', formData.value)
  }
}
// 获取时间
const handleChange = (date) => {
  console.log(
    date,
    formData.value.estimatedServerTime,
    new Date(date).getTime(),
    'date1'
  )
  formData.value.estimatedServerTime = new Date(date).getTime()
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.mark = ''
  formData.value.estimatedServerTime = ''
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
  formData.value.taskImage = ''
}
// 上传图片失败
const handleFail = (file) => {
  console.log(file)
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const photo = params.response.data
  formData.value.taskImage = photo
  photoFile.value[0].response.url = photo
  photoFile.value[0].url = photo
  console.log(photoFile.value, 'photoFile.value')
}
// 限制图片的大小
const beforeUpload = (file) => {
  if (file.size > 2 * 1024 * 1024) {
    MessagePlugin.error('图片大小超过2M，请重新上传')
    return false
  }
  return true
}
defineExpose({
  handleClear
})
</script>
<style lang="less" scoped>
.expectTime {
  width: 400px;
}
</style>
