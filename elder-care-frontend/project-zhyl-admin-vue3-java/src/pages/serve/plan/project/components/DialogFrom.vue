<!-- 护理项目新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '护理项目'"
      :footer="false"
      :on-close="onClickCloseBtn"
    >
      <template #body>
        <!-- 表单内容 -->
        <div class="dialogCenter">
          <div class="dialogOverflow">
            <t-form
              ref="form"
              :data="formData"
              :rules="rules"
              :label-width="110"
              :reset-type="resetType"
              @reset="onClickCloseBtn"
              @submit="onSubmit"
            >
              <t-form-item label="护理项目名称：" name="name">
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
              <t-form-item label="价格：" name="price">
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
              <t-form-item label="单位：" name="unit">
                <t-input
                  v-model="formData.unit"
                  class="wt-400"
                  placeholder="请输入"
                  clearable
                  show-limit-number
                  :maxlength="5"
                >
                </t-input>
              </t-form-item>
              <t-form-item label="排序：" name="orderNo">
                <t-input-number
                  v-model="formData.orderNo"
                  :min="minNumber"
                  @blur="textBlurNo"
                  @change="textBlurNo"
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
              <t-form-item label="护理图片：" name="image">
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
              <t-form-item label="护理项目描述：" name="nursingRequirement"
                ><t-textarea
                  v-model="formData.nursingRequirement"
                  class="wt-400"
                  placeholder="请输入"
                  show-limit-number
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
  // 最新值
  minNumber: {
    type: Number,
    default: 1
  },
  // 标题
  title: {
    type: String,
    default: '新增'
  },
  //   房间类型
  roomTypeData: {
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
  'handleEdit'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
// 表单数据
const formData = ref<Object | any>({
  status: 1,
  orderNo: 1
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
    // 名称校验
    {
      required: true,
      message: '护理项目名称为空，请输入护理项目名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  // 费用校验
  price: [
    {
      required: true,
      message: '价格为空，请输入价格',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '价格为空，请输入价格',
      type: 'error',
      trigger: 'change'
    }
  ],
  // 单位
  unit: [
    {
      required: true,
      message: '单位为空，请输入单位',
      type: 'error',
      trigger: 'blur'
    }
  ],
  // 排序
  orderNo: [
    {
      required: true,
      message: '排序为空，请输入排序',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 1,
      message: '排序为空，请输入排序',
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
  // 护理图片
  image: [
    {
      required: true,
      message: '护理图片为空，请上传护理图片',
      type: 'error',
      trigger: 'change'
    }
  ],
  //   项目描述
  nursingRequirement: [
    {
      required: true,
      message: '护理项目描述为空，请输入护理项目描述',
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
      url: val.image
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
      emit('handleEdit', formData.value)
    }
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.orderNo = 1
  formData.value.status = 1
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
  minPrice(data)
}
// 监听排序
const textBlurNo = () => {
  const data = Number(formData.value.orderNo)
  minNum(data)
}
// 当前输入的金额小于0的时候显示0.00
const minPrice = (val) => {
  if (val < 0) {
    formData.value.price = '0.00'
  }
}
// 当前输入的排序小于等于1的时候显示1
const minNum = (val) => {
  if (val <= 1) {
    formData.value.orderNo = 1
  }
}
// 移除图片时将图片设置为默认图片
const remove = () => {
  photoFile.value = []
  formData.value.image = ''
}
// 上传图片失败
const handleFail = ({ file }) => {
  MessagePlugin.error(`图片 ${file.name} 上传失败`)
}
// 上传成功后触发。
const handleSuccess = (params) => {
  const photo = params.response.data
  formData.value.image = photo
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
