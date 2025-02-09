<!-- 房型新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '房型'"
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
            <t-form-item label="房型类型：" name="name">
              <t-input
                v-model="formData.name"
                class="wt-400"
                placeholder="请输入"
                clearable
                :maxlength="10"
                show-limit-number
              >
              </t-input>
            </t-form-item>
            <t-form-item label="床位费用：" name="price">
              <t-input-number
                v-model="formData.price"
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
            <t-form-item label="房型图片：" name="photo">
              <t-upload
                ref="uploadRef"
                v-model="photoFile"
                action="api/common/upload"
                :autoUpload="autoUpload"
                theme="image"
                :size-limit="sizeLimit"
                tips="图片大小不超过2M,仅支持上传PNG JPG JPEG类型图片"
                accept="image/*"
                @remove="remove"
                @fail="handleFail"
                @success="handleSuccess"
              ></t-upload>
            </t-form-item>
            <t-form-item label="房型介绍：" name="introduction"
              ><t-textarea
                v-model="formData.introduction"
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
  //   房间类型
  roomTypeData: {
    type: Array,
    default: () => []
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'handleAdd',
  'handleEditForm'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  status: 1
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
  name: [
    // 房型类型校验
    {
      required: true,
      message: '房型类型为空，请输入房型类型',
      type: 'error',
      trigger: 'blur'
    }
  ],
  price: [
    {
      required: true,
      message: '床位费用为空，请输入床位费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '床位费用为空，请输入床位费用',
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
  //   图片
  photo: [
    {
      required: true,
      message: '房型图片为空，请上传房型图片',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   介绍
  introduction: [
    {
      required: true,
      message: '房型介绍为空，请输入房型介绍',
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
    const obj = {
      url: val.photo
    }
    photoFile.value.push(obj)
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
  formData.value.price = ''
  photoFile.value = []
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// // 监听课程价格
const textBlurPrice = () => {
  const data = Number(formData.value.price)
  minNum(data)
}
// 当前输入的金额小于0的时候显示0.00
const minNum = (val) => {
  if (val < 0) {
    formData.value.price = '0.00'
  }
}
// 移除图片时将图片设置为默认图片
const remove = () => {
  photoFile.value = []
  formData.value.photo = ''
}
// 上传图片失败
const handleFail = () => {
  MessagePlugin.error(`文件上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const photo = params.response.data
  formData.value.photo = photo
  photoFile.value[0].response.url = photo
  photoFile.value[0].url = photo
}
// 传递给父组件的方法
defineExpose({
  handleClear
})
</script>
