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
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { MessagePlugin, Select, TimePicker } from 'tdesign-vue-next'
import { Icon } from 'tdesign-icons-vue-next'
import { periodData } from '@/utils/commonData'
import { validateTextLen } from '@/utils/validate'
import SelectInput from './Select.vue'
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
const isAddData = ref(false)
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
const getBaseData = () => {
  const obj = {
    key: '0',
    projectId: null,
    executeCycle: 1,
    executeFrequency: 1,
    executeTime: '08:00'
  }
  return [obj]
}
const data = ref<Object | any>(getBaseData())
const paramsData = ref<Object | any>(getBaseData())
const editableRowKeys = ref([])
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
  () => {
    formVisible.value = props.visible
    title.value = props.title
  }
)
// 监听器，监听父级传递的data值，控制表单数据
watch(
  () => props.baseData,
  (val) => {
    formData.value = val
    // 处理后端返回的数据（时间段）
    const arr = []
    if (val.projectPlans) {
      val.projectPlans.forEach((ele) => {
        // 把数据处理下付给data，用来回显页面数据
        const obj = {
          key: '0',
          id: ele.id,
          projectId: ele.projectId,
          projectName: ele.projectName,
          executeCycle: ele.executeCycle,
          executeFrequency: ele.executeFrequency,
          executeTime: ele.executeTime
        }
        arr.push(obj)
        // // 护理计划详情回显数据处理
        cashData.value.forEach((item, i) => {
          if (ele.projectId === item.value) {
            cashData.value.splice(i, 1)
          }
        })
      })
      paramsData.value = arr
      data.value = arr
    } else {
      paramsData.value = getBaseData()
      data.value = getBaseData()
    }
    // 控制是否显示添加按钮
    if (props.projectData.length === formData.value.projectPlans.length) {
      isAddData.value = true
    } else {
      isAddData.value = false
    }
  }
)
// -----定义方法------
onMounted(() => {
  getRowKey()
})
// 提交表单
const nums = ref(0)
const onSubmit = () => {
  nums.value = 0
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
            data.value[i].valueEmpty = true // 方便护理项目名称添加红框他ishi
            nums.value++ // 用来判断是否填写完了 0代表护理信息全部填写完成
            return false
          }
          data.value[i].valueEmpty = false
          // nums.value--
        }
      })
    })
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
  // cashData.value = projectBaseData.value
  // projectBaseData.value = []
  nums.value = 0
  isAddData.value = false
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
  data.value.splice(index, 1)
  paramsData.value.splice(index, 1)
  // 删除数据后，如果已经选择的项目，需要把删除的数据重新添加到项目列表里
  if (val.projectId) {
    projectBaseData.value.forEach((ele) => {
      if (ele.value === val.projectId) {
        cashData.value.splice(index, 0, ele)
      }
    })
  }
  data.value.forEach((obj, i) => {
    obj.key = String(i)
  })
  isAddData.value = false
}
// 添加
const handleRowAdd = () => {
  selectOldData.value = null
  // 更具项目数量来限制添加护理计划
  if (!isAddData.value) {
    const obj = {
      key: data.value.length > 0 ? String(data.value.length) : '0',
      projectId: null,
      executeCycle: 1,
      executeFrequency: 1,
      executeTime: '08:00'
    }
    data.value.push(obj)
    if (formData.value.id === undefined) {
      paramsData.value.push(obj)
    }
    getRowKey()
  }
  // 判断当前添加的护理计划项目是不是大于护理项目，如果大于的话，禁止添加
  // 如果是删除了一条，还可以继续添加，根据需求要求来实现
  if (data.value.length >= props.projectData.length) {
    isAddData.value = true
  } else {
    isAddData.value = false
  }
}
// 监听输入的执行频次
const textBlurNo = (e) => {
  const num = e.executeFrequency
  if (num > 7 || num < 0 || num === undefined) {
    MessagePlugin.error('请输入1-7的整数')
  }
  e.executeFrequency = minNum(num)
  // 把处理完的当前修改的频率给paramsData.value
  paramsData.value.forEach((ele) => {
    if (ele.$index >= 0) {
      if (ele.$index === e.$index) {
        ele.executeFrequency = e.executeFrequency
      }
    } else if (ele.key === e.key) {
      ele.executeFrequency = e.executeFrequency
    }
  })
}
// 当前输入的排序小于等于7的时候显示1
const minNum = (val) => {
  if (val === undefined || val < 1) {
    return 1
  }
  if (val > 7) {
    return 7
  }
  return val
}
const selectOldData = ref(null)
const getSelectOldData = (val) => {
  selectOldData.value = val
}
// 选择计划项目下拉
const selectChange = (val, rowIndex, ind) => {
  // val选择的某一个，key当前的行索引
  // 把选中的只赋值给data
  data.value[rowIndex].projectName = val.label
  data.value[rowIndex].projectId = val.value
  data.value[rowIndex].valueEmpty = false
  // // selectOldData.value存储的是点击input选择框已经选择的数据，默认是空
  // // 选择框不是空的逻辑（当前的选项 加到  cashData   然后 cashData.value.splice(index, 1)）
  if (selectOldData.value) {
    // 1、筛选已经选过的数据，获取已选索引值（需要注意的是这条数据是已经选过老数据而不是新数据）
    const index = projectBaseData.value.findIndex(
      (item) => item.label === selectOldData.value
    )
    // 2、选中下拉菜单后，通过以上第一步的索引值把选中前的旧数据重新放到下拉菜单总数据里面
    cashData.value.push(projectBaseData.value[index])
    // 3、然后把已经选中的数据（新数据）从下拉菜单总数据中删除
    cashData.value.splice(ind, 1)
  } else {
    // 如果是新添加了一条计划，直接选择项目后再删除下拉菜单中的数据
    const index = cashData.value.findIndex((item) => item.value === val.value)
    cashData.value.splice(index, 1)
  }

  // // 把处理完的当前修改的护理项目id给paramsData.value
  // paramsData.value.forEach((ele) => {
  //   if (ele.$index >= 0) {
  //     if (ele.$index === rowIndex) {
  //       ele.projectId = val.value
  //     }
  //   } else if (Number(ele.key) === rowIndex) {
  //     ele.projectId = val.value
  //   }
  // })
}
defineExpose({
  handleClear
})
</script>
<style scoped>
.t-table__content {
  overflow: initial;
}
</style>
