<!-- 护理计划名称新增编辑弹窗 -->
<template>
  <div class="dialogBox tableDialog roomDialog">
    <t-dialog
      v-model:visible="formVisible"
      :header="title + '护理计划'"
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
            :label-width="110"
            on-cancel="onClickCloseBtn"
            :reset-type="resetType"
            @submit="onSubmit"
          >
            <t-form-item label="护理计划名称：" name="planName">
              <t-input
                v-model="formData.planName"
                class="wt-400"
                placeholder="请输入"
                clearable
                :maxlength="10"
                show-limit-number
              >
              </t-input>
            </t-form-item>
            <t-form-item label="护理项目：" name="price">
              <div
                class="scrollTable"
                :class="showPageTip ? 'heighta' : 'dialogHeight'"
              >
                <t-table
                  ref="tableRef"
                  :class="data.length < 6 ? 'lastTable' : ''"
                  row-key="key"
                  :columns="FROMCOLUMNS"
                  :data="data"
                  :editable-row-keys="editableRowKeys"
                  table-layout="auto"
                  :scroll="{ type: 'virtual', rowHeight: 48, bufferSize: 10 }"
                  :height="data.length < 6 ? null : 423"
                  :async-loading="loadingNode"
                  @row-edit="onRowEdit"
                  @scroll="handleScroll($event)"
                >
                  <!-- 护理项目 -->
                  <template #projectId="{ row, rowIndex }">
                    <SelectInput
                      :showPageTip="showPageTip"
                      :base-data="cashData"
                      :index="rowIndex"
                      :value="row.projectName"
                      :value-empty="row.valueEmpty"
                      @select="selectChange"
                      @getSelectOldData="getSelectOldData"
                    />
                  </template>
                  <!-- end -->
                  <!-- 执行频次 -->
                  <template #executeFrequency="{ row }">
                    <t-input-number
                      v-model="row.executeFrequency"
                      theme="normal"
                      :max="7"
                      :min="1"
                      :rules="[
                        { required: true, message: '请输入' },
                        { min: 1, message: ' ' },
                        { max: 7, message: ' ' }
                      ]"
                      class="numInput"
                      @blur="textBlurNo(row)"
                    ></t-input-number>
                  </template>
                  <!-- end -->
                  <!-- 操作栏 -->
                  <template #op="{ row, rowIndex }">
                    <div class="addInput">
                      <icon
                        v-if="data.length > 1"
                        name="minus-rectangle"
                        @click="handleDelete(row, rowIndex)"
                      />
                      <icon
                        v-if="rowIndex === 0 && !isAddData"
                        name="add-rectangle"
                        @click="handleRowAdd"
                      />
                    </div>
                  </template>
                  <!-- end -->
                </t-table>
              </div>
              <div v-if="showPageTip" class="footInfo">已经到底了~</div>
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
          <div class="footTip"></div>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { MessagePlugin, Select, TimePicker } from 'tdesign-vue-next'
import { Icon } from 'tdesign-icons-vue-next'
import { periodData } from '@/utils/commonData'
import SelectInput from './Select.vue'
// 封装好的方法，护理计划
import {
  getTableData,
  getSeleteData,
  getBaseAllData,
  getBaseData,
  deleteProData,
  textExecuteBlur,
  addProData
} from '../../../index'
// 获取父组件值、方法
const props = defineProps({
  // 弹层隐藏显示
  visible: {
    type: Boolean,
    default: false
  },
  //   详情数据
  baseData: {
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
  // 所有项目
  projectData: {
    type: Array<Object | any>,
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
  'handleEdit',
  'selectChange'
])
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const formVisible = ref(false) // 弹窗
const formData = ref<Object | any>({}) // 表单数据
const title = ref() // 弹窗标题
const asyncLoading = ref('loading-custom')
const projectBaseData = ref([]) // 护理项目列表
const customLoadingNode = (h) => {
  return `已经到底了`
}
const showPageTip = ref(false) // 数据到底了提示
const loadingNode = computed(() =>
  asyncLoading.value === 'loading-custom'
    ? customLoadingNode
    : asyncLoading.value
)
const tableRef = ref(null)
// 表单校验
const rules = {
  planName: [
    // 护理计划名称校验
    {
      required: true,
      message: '护理计划名称为空，请输入护理计划名称',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
const fixedTopAndBottomRows = ref(false)
const data = ref<Object | any>(getBaseData())
const paramsData = ref<Object | any>(getBaseData())
const editableRowKeys = ref([])
const selectOldData = ref(null)
// 处理默认编辑
const getRowKey = () => {
  editableRowKeys.value = []
  data.value.forEach((ele, i) => {
    editableRowKeys.value.push(String(i))
  })
}
// 保存变化过的行信息
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '护理项目名称',
      colKey: 'projectId'
    },
    {
      title: '期望服务时间',
      colKey: 'executeTime',
      className: 't-demo-col__datepicker',
      // props, 透传全部属性到 DatePicker 组件
      edit: {
        component: TimePicker,
        props: {
          format: 'HH:mm'
        },
        showEditIcon: false,
        // 默认是否为编辑状态
        defaultEditable: true,
        // 校验规则，此处同 Form 表单
        rules: [{ required: true }]
      },
      cell: (h, { row }) => {
        return row.executeTime
      }
    },
    {
      title: '执行周期',
      colKey: 'executeCycle',
      cell: (h, { row }) =>
        periodData.find((t) => t.value === row.executeCycle)?.label,
      edit: {
        component: Select,
        // props, 透传全部属性到 Select 组件
        props: {
          clearable: true,
          options: periodData
        },
        // 校验规则，此处同 Form 表单
        rules: [{ required: true, message: '请输入' }],
        showEditIcon: false,
        // 默认是否为编辑状态
        defaultEditable: true
      }
    },
    {
      title: '执行频次(次)',
      colKey: 'executeFrequency',
      width: 100
    },
    {
      align: 'left',
      fixed: 'right',
      width: 90,
      minWidth: 90,
      colKey: 'op',
      title: '操作'
    }
  ]
})
const cashData = ref([]) // 下拉的数据
// 监听项目所有数据
watch(
  () => props.projectData,
  (val) => {
    projectBaseData.value = []
    cashData.value = []
    val.forEach((ele, i) => {
      // 组成新的数组
      const obj = { label: ele.name, value: ele.id }
      projectBaseData.value.push(obj)
      cashData.value.push(obj)
    })
  }
)
// 监听器，监听父级传递的visible值，控制弹窗显示隐藏
watch(
  () => props.visible,
  (val) => {
    formVisible.value = props.visible
    title.value = props.title
    if (val) {
      showPageTip.value = false
    }
  }
)
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.baseData,
  (val) => {
    // 把详情数据赋值给表单
    if (val.id !== undefined) {
      formData.value = val
      // 处理后端返回的数据（时间段）
      // 传参getBaseAllData是分装好的方法，直接给它传参就可以
      const obj = getBaseAllData(
        props.baseData.projectPlans,
        cashData.value,
        props.projectData.length, // 所有护理项目
        formData.value.projectPlans.length // 表单的护理护理项目
      )
      cashData.value = obj.cashArr // 获取处理后的下拉菜单数据
      paramsData.value = obj.paramsData
      data.value = obj.dataArr // 获取处理好的护理项目列表数据
      getRowKey()
    } else {
      formData.value = {}
      data.value = getBaseData()
    }
  }
)
// 控制是否显示添加/删除计划按钮，如果当前添加的计划等于所有的护理项目，就禁止添加计划
const isAddData = computed(() => {
  if (data.value.length === props.projectData.length) {
    return true
  }
  return false
})
// -----定义方法------
onMounted(() => {
  getRowKey()
})
// 提交表单
const nums = ref(0)
const onSubmit = () => {
  nums.value = 0 // 每次触发提交按钮，重新计算填写的信息是否完整
  tableRef.value.validateTableData().then((params) => {
    formData.value.projectPlans = data.value
    const count = Object.keys(params.result).length
    if (count > 0) {
      MessagePlugin.error('护理项目信息不完整，请重新设置')
      return false
    }
    if (formData.value.planName === undefined) {
      MessagePlugin.error('护理项目信息不完整，请重新设置')
      return false
    }
    // 查询数据有没有填写完整
    data.value.forEach((obj, num) => {
      formData.value.projectPlans.forEach((ele, i) => {
        if (obj.key === ele.key) {
          if (!ele.projectId) {
            data.value[i].valueEmpty = true // 方便护理项目名称添加红框他
            nums.value++ // 用来判断是否填写完了 0代表护理信息全部填写完成
            return false
          }
          data.value[i].valueEmpty = false
        }
      })
    })
    // 判断没有填写的表单
    if (nums.value <= 0) {
      if (props.title === '新增') {
        // 调用新增接口
        emit('handleAdd', formData.value)
      } else {
        // 调用编辑接口
        emit('handleEdit', formData.value)
      }
    } else {
      MessagePlugin.error('护理项目信息不完整，请重新设置')
    }
  })
}
// 滚动表格
const handleScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.e.target
  if (Math.floor(scrollTop) + clientHeight === scrollHeight) {
    // 判断是否全部加载完成
    asyncLoading.value = 'loading-custom'
    showPageTip.value = true
    fixedTopAndBottomRows.value = true
  } else {
    showPageTip.value = false
    fixedTopAndBottomRows.value = false
  }
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  form.value.reset()
  data.value = getBaseData()
  paramsData.value = getBaseData()
  nums.value = 0
  formData.value = {}
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
  emit('handleClose')
}

// 编辑行后获取所有触发的数据
const onRowEdit = (params) => {
  // 修改后的当前行赋值给原始数据
  paramsData.value[params.rowIndex][params.col.colKey] = params.value
}
// 删除一条护理项目
const handleDelete = (val, index) => {
  const objData = deleteProData(
    val, // 要删除的数据
    index, // 要删除数据的索引
    data.value, // 护理项目列表数据
    paramsData.value,
    projectBaseData.value, // 护理项目所有数据
    cashData.value, // 当前的下拉菜单数据
    formData.value.id
  )
  data.value = objData.dataArr // 获取处理完后的列表数据
  paramsData.value = objData.paramsArr
  cashData.value = objData.cashArr // 获取处理完后的下拉菜单的数据
}
// 添加一条护理项目
const handleRowAdd = () => {
  selectOldData.value = null
  // 更具项目数量来限制添加护理计划
  // 把参数传给相对应的封装方法
  const objData = addProData(
    isAddData.value, // 是否可以继续添加新增删除计划按钮
    data.value,
    paramsData.value,
    formData.value.id
  )
  data.value = objData.data
  paramsData.value = objData.paramsData
  getRowKey()
}
// 监听输入的执行频次
const textBlurNo = (e) => {
  paramsData.value = textExecuteBlur(e, paramsData.value) // 把需要处理的数据传给封装好的方法
}

// 获取已经选择过的数据(旧数据)
const getSelectOldData = (val) => {
  selectOldData.value = val
}
// 选择计划项目下拉
const selectChange = (val, rowIndex, ind) => {
  // val选择的某一个，key当前的行索引
  // 把选中的只赋值给data(table列表数据)
  data.value = getTableData(rowIndex, val, data.value)
  // 选护理项目切换数据时的逻辑：需要把数据传给封装好的方法
  cashData.value = getSeleteData(
    val, // 当前选择的数据
    ind, // 当前选择的索引值
    selectOldData.value, // 已经选择的数据（下拉菜单修改前的数据）
    projectBaseData.value, // 所有护理项目
    cashData.value // 下拉菜单中要展示的数据
  )
}
// 向父组件暴露数据与方法
defineExpose({
  handleClear
})
</script>
<style scoped>
.t-table__content {
  overflow: initial;
}
</style>
