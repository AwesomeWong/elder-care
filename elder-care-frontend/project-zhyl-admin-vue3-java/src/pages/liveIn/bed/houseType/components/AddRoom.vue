<!-- 房间新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '房间'"
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
            <t-form-item label="房间号：" name="code">
              <t-input
                v-model="formData.code"
                class="wt-400"
                placeholder="请输入"
                clearable
                show-limit-number
                :maxlength="5"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="房间类型：" name="typeName">
              <t-select
                v-model="formData.typeName"
                clearable
                filterable
                placeholder="请选择"
              >
                <t-option
                  v-for="(item, index) in roomTypeData"
                  :key="index"
                  :value="item.name"
                  :label="item.name"
                  title=""
                >
                  {{ item.name }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="排序：" name="sort">
              <t-input-number
                v-model="formData.sort"
                :min="minNumber"
                :decimal-places="0"
                @blur="textBlurNo"
                @change="textBlurNo"
              ></t-input-number>
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
import { ValidateResultContext } from 'tdesign-vue-next'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  // 房间类型
  houseTypeData: {
    type: Array,
    default: () => {
      return []
    }
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
  code: '',
  sort: 1,
  typeName: ''
})
// 表单校验
const rules = {
  code: [
    // 名称校验
    {
      required: true,
      message: '房间号为空，请输入房间号',
      type: 'error',
      trigger: 'blur'
    }
  ],
  typeName: [
    // 房间校验
    {
      required: true,
      message: '房间类型为空，请选择房间类型',
      type: 'error',
      trigger: 'change'
    }
  ],
  sort: [
    // 排序校验
    {
      required: true,
      message: '排序为空，请输入排序',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
// 弹窗标题
const title = ref()
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(props, (val) => {
  formVisible.value = val.visible
  title.value = val.title
})
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.data,
  (val) => {
    formData.value.id = val.id
    formData.value.typeName = val.typeName
    formData.value.sort = val.sort
    formData.value.code = val.code
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
  formData.value.sort = 1
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}
// 监听排序
const textBlurNo = () => {
  const data = Number(formData.value.sort)
  if (data <= 1) {
    formData.value.sort = 1
  }
}
// 传递给父组件的方法
defineExpose({
  handleClear
})
</script>
