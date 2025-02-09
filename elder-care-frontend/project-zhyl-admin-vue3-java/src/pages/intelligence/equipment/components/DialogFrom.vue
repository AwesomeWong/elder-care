<!-- 设备新增编辑弹窗 -->
<template>
  <div class="dialog-form facilityForm">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '设备'"
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
            :label-width="88"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @reset="onClickCloseBtn"
            @submit="onSubmit"
          >
            <t-form-item label="设备名称：" name="deviceName">
              <t-input
                v-model="formData.deviceName"
                class="wt-400"
                placeholder="请输入"
                clearable
                show-limit-number
                :maxlength="15"
                :disabled="formData.id !== undefined && formData.id !== ''"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="备注名称：" name="nickname">
              <t-input
                v-model="formData.nickname"
                class="wt-400"
                placeholder="请输入"
                clearable
                show-limit-number
                :maxlength="15"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="所属产品：" name="productKey">
              <t-select
                v-model="formData.productKey"
                clearable
                filterable
                placeholder="请选择"
                :disabled="formData.id !== undefined && formData.id !== ''"
              >
                <t-option
                  v-for="(item, index) in productData"
                  :key="index"
                  :value="item.productKey"
                  :label="item.productName"
                  title=""
                ></t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="接入类别：" name="locationType">
              <t-radio-group
                v-model="formData.locationType"
                @change="handleRadio"
              >
                <t-radio
                  v-for="(item, index) in cutInData"
                  :key="index"
                  :value="item.id"
                  >{{ item.value }}</t-radio
                >
              </t-radio-group>
            </t-form-item>
            <t-form-item
              v-if="formData.locationType === 0"
              label="接入位置："
              name="name"
            >
              <t-input
                v-model="formData.name"
                placeholder="请选择"
                class="wt-300"
                :readonly="readonly"
                @focus="selectFlavor"
                @blur="outSelect"
              >
                <template #suffixIcon
                  ><t-icon :name="mak ? 'chevron-up' : 'chevron-down'"></t-icon
                ></template>
              </t-input>
            </t-form-item>
            <t-form-item v-else label="接入位置：" name="localName">
              <t-cascader
                v-model="value"
                :keys="{ label: 'code', value: 'ids', children: 'children' }"
                :options="floorData"
                check-strictly
                value-type="full"
                class="wt-300"
                @change="handleFloor"
              />
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
import { ref, watch, computed } from 'vue'
import { ValidateResultContext } from 'tdesign-vue-next'
// 基础数据
import { cutInData } from '@/utils/commonData'
import { validateForbid } from '@/utils/validate'
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
  // 选择的老人
  manInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 楼层房间床位数据
  floorData: {
    type: Array,
    default: () => {
      return []
    }
  },
  productData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'handleClose',
  'fetchData',
  'handleAdd',
  'handleEditForm',
  'getOldList',
  'handleOpen'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const mak = ref(false) // 控制input上下箭头
const formVisible = ref(false) // 弹窗
const readonly = ref(false) // 是否只读
const value = ref([])
// 表单数据
const formData = ref<Object | any>({
  locationType: 0
})

// 表单校验
const rulesForm = {
  deviceName: [
    {
      required: true,
      message: '设备名称为空，请输入设备名称',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateForbid,
      message:
        '支持英文字母、数字、下划线（_）、中划线（-）、点号（.）、半角冒号（:）和特殊字符@，长度限制为4~32个字符',
      type: 'error',
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      required: true,
      message: '备注名称为空，请输入备注名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  productKey: [
    {
      required: true,
      message: '所属产品为空，请选择所属产品',
      type: 'error',
      trigger: 'change'
    }
  ],
  locationType: [
    {
      required: true,
      message: '接入类别为空，请选择接入类别',
      type: 'error',
      trigger: 'change'
    }
  ],
  name: [
    {
      required: true,
      message: '接入位置为空，请选择接入位置',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const rulesFormLocalTion = {
  localName: [
    {
      required: true,
      message: '接入位置为空，请选择接入位置',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const rules = computed(() => {
  if (formData.value.locationType === 0) {
    return { ...rulesForm }
  }
  return { ...rulesForm, ...rulesFormLocalTion }
})
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
    if (val.locationType === 0) {
      formData.value.name = val.elderName
    } else if (val.deviceDescription !== undefined) {
      getStrArr()
      formData.value.localName = value.value
    }
  }
)
watch(
  () => props.manInfo,
  (val) => {
    formData.value.name = val.name
    formData.value.elderId = val.elderId
  }
)
// -----定义方法------
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    const data = formData.value
    let params = {
      deviceName: data.deviceName,
      locationType: data.locationType,
      nickname: data.nickname,
      productKey: data.productKey,
      registerDeviceRequest: {
        deviceName: data.deviceName,
        nickname: data.nickname,
        productKey: data.productKey
      }
    }
    // 如果选择的接入类别是1，需要传楼层房间id
    if (data.locationType === 1) {
      const valueArr = []
      value.value.forEach((eleObj) => {
        valueArr.push(eleObj.substring(1))
      })
      params = {
        ...params,
        physicalLocationType: valueArr.length - 1,
        bindingLocation: valueArr[valueArr.length - 1],
        deviceDescription: valueArr.join(),
        remark: data.remark
      }
    } else {
      // 否则传老人的id
      params = {
        ...params,
        bindingLocation: data.elderId,
        remark: data.name
      }
    }
    if (props.title === '新增') {
      // 调用新增接口
      emit('handleAdd', params)
    } else {
      // 调用编辑接口
      params = {
        ...params,
        id: formData.value.id,
        iotId: formData.value.iotId
      }
      emit('handleEditForm', params)
    }
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  formData.value.id = ''
  value.value = []
  delete formData.value.elderId
  delete formData.value.elderName
  formData.value.locationType = 0
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()

  emit('handleClose')
}
// 选择老人获取相关联的信息
const selectFlavor = () => {
  mak.value = true
  readonly.value = true
  emit('handleOpen', formData.value.name)
}
const outSelect = (e) => {
  setTimeout(function () {
    mak.value = false
    readonly.value = false
  }, 200)
}
// 处理数据value
const getStrArr = () => {
  value.value = props.data.deviceDescription.split(',')
  value.value[0] = `f${value.value[0]}`
  value.value[1] = `r${value.value[1]}`
  value.value[2] = `b${value.value[2]}`
}
// 选择接送类别
const handleRadio = () => {
  const data = props.data
  // 如果接入类型选择的是位置，需要把老人的选项内容清掉
  if (formData.value.locationType === 1) {
    // 获取详情要回显的数据
    if (data.deviceDescription !== undefined) {
      getStrArr()
    } else {
      delete formData.value.name
    }
  }
  // 反之，接入类型选择的是老人，需要把位置的选项内容清掉
  if (formData.value.locationType === 0) {
    value.value = []
    formData.value.localName = []
    // 获取详情要回显的数据
    if (data.remark !== undefined) {
      formData.value.name = data.elderName
      formData.value.elderId = data.elderId
    } else {
      delete formData.value.name
      delete formData.value.elderId
    }
  }
}
// 选择楼层、房间、床位
const handleFloor = () => {
  const valueArr = []
  value.value.forEach((eleObj) => {
    valueArr.push(eleObj.substring(1))
  })
  formData.value.localName = valueArr
  const data = []
  props.floorData.forEach((ele) => {
    if (ele.ids === value.value[0]) {
      data.push(ele.name)
      ele.roomVoList.forEach((obj) => {
        if (obj.ids === value.value[1]) {
          data.push(obj.code)
          obj.bedVoList.forEach((val) => {
            if (val.ids === value.value[2]) {
              data.push(val.bedNumber)
            }
          })
        }
      })
    }
  })
  formData.value.remark = data.join()
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
