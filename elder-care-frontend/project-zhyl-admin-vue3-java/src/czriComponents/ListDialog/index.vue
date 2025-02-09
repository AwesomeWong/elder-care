<!--带列表的弹窗+分页-->
<template>
  <div class="dialogBox dialogTable">
    <t-dialog
      v-model:visible="dialogVisible"
      header="分页标签"
      :on-close="handleClose"
      :on-confirm="handleSubmit"
      :footer="false"
      @close-btn-click="handleClose"
    >
      <div>
        <!-- 搜索 -->
        <t-form ref="ruleForm" :data="formData" :label-width="70">
          <t-row>
            <t-col :span="12">
              <t-row>
                <t-col :span="6">
                  <t-form-item label="规则编号：" name="index">
                    <t-input
                      v-model="formData.index"
                      class="form-item-content"
                      clearable
                      type="search"
                      placeholder="请输入"
                      @clear="onClear"
                    />
                  </t-form-item>
                </t-col>
                <div
                  type="submit"
                  variant="base"
                  theme="primary"
                  class="bt wt-60"
                  @click="handleSearch()"
                >
                  搜索
                </div>
              </t-row>
            </t-col>
          </t-row>
        </t-form>
        <!-- end -->
        <!-- table 数据 -->
        <t-table
          ref="regTable"
          row-key="id"
          :data="dialogData"
          :columns="COLUMNS"
          :loading="dataLoading"
          :hover="true"
          :pagination="{ ...pagination, ...paginationInfo }"
          cell-empty-content="-"
          :disable-data-page="pagination.total <= 10"
          :selected-row-keys="selectedRowKeys"
          :max-height="382"
          @page-change="handleChange"
          @select-change="handleChangeSelection"
        >
        </t-table>
        <!-- end -->
        <!-- 底部按钮 -->
        <div class="dialog-footer">
          <button
            theme="primary"
            type="submit"
            class="bt-grey wt-60"
            @click="handleClose"
          >
            <span>取消</span>
          </button>
          <button
            theme="primary"
            type="submit"
            class="bt wt-60"
            @click="handleSubmit"
          >
            <span>确定</span>
          </button>
        </div>
        <!-- end -->
      </div>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { COLUMNS } from '../CardListSort/constants'
// 获取父组件值、方法
const props = defineProps({
  // 获取列表数据
  dialogData: {
    type: Array,
    default: () => []
  },
  // 弹层隐藏显示
  dialogVisible: {
    type: Boolean,
    default: false
  },
  //   加载中
  dataLoading: {
    type: Boolean,
    default: false
  },
  // 分页内容
  pagination: {
    type: Object
  },
  // 详情获取的已选项
  selectData: {
    type: Array,
    default: () => []
  },
  // 选择项的最大值
  maxiNum: {
    type: Number,
    default: 0
  }
})
// ------定义变量------
const emit = defineEmits([
  'handleCloseDialog',
  'handleSizeChange',
  'gitList',
  'handleCurrentChange',
  'handleSubmit'
]) // 子组件获取父组件事件传值
const regTable = ref() // 定义表格ref
const ruleForm = ref(null) // 定义表单ref
const formData = ref(props.pagination) // 搜索表单
const dialogVisible = ref(false) // 用来控制弹层显示隐藏
const selectedRowKeys = ref([]) // 选中的数据
const checkTableList = reactive<Object | any>([]) // 选中的list
const paginationInfo = ref({
  totalContent: false
}) // 分页基本设置
// 监听弹层是显示还是隐藏
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal
    if (newVal) {
      nextTick(() => {
        props.dialogData.forEach((row: Object | any) => {
          selectedRowKeys.value = []
          props.selectData.forEach((selected: Object | any) => {
            if (selected.id === row.id) {
              checkTableList.value = props.selectData
              selectedRowKeys.value.push(selected.id)
            }
          })
        })
      })
    }
  }
)
// 监听从父级获取的全部列表数据和详情数据，设置默认显示列表勾选选项
watch(
  () => props.dialogData,
  (count) => {
    if (count) {
      nextTick(() => {
        count.forEach((row: Object | any) => {
          props.selectData.forEach((selected: Object | any) => {
            if (selected.id === row.id) {
              setTimeout(() => {
                checkTableList.value = props.selectData
                selectedRowKeys.value.push(selected.id)
              }, 10)
            }
          })
        })
      })
    }
  }
)
// ------定义方法------
// 确认提交
const handleSubmit = async () => {
  // checkTableList.value是选择的内容传给父组件
  emit('handleSubmit', checkTableList.value)
  handleClose()
}
// 关闭弹层
const handleClose = () => {
  emit('handleCloseDialog')
}
// 触发复选框
const handleChangeSelection = (index, { selectedRowData }) => {
  let val = selectedRowData
  const checkData = props.selectData // 把数据深拷贝
  val.forEach((ele, i) => {
    if (ele === undefined) {
      val.splic(i, 1)
    }
    // 如果列表中有选中的数据，先把重复的数据删除掉再合并为一个新的数组
    if (checkData) {
      checkData.forEach((obj: Object | any, index) => {
        if (selectedRowData) {
          selectedRowData.forEach((row: Object | any) => {
            if (row.id !== ele.id && row.id === obj.id) {
              checkData.splice(index, 1)
            }
          })
        }
        if (obj.id === ele.id) {
          checkData.splice(index, 1)
        }
      })
    }
  })

  // 合并数组，详情获取的和已经选择的
  val = [...checkData, ...val]
  // 数组去重
  const res = new Map()
  val = val.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
  if (val) {
    if (val.length > props.maxiNum) {
      // 截取前5位
      val = val.slice(0, props.maxiNum)
      MessagePlugin.error({
        content: `最多可设置${props.maxiNum}名课程老师!`
      })
    }
    // 先清空要
    selectedRowKeys.value = []
    val.forEach((ele) => {
      selectedRowKeys.value.push(ele.id)
    })
  }
  // 要传给父组件的选择数据
  checkTableList.value = val
}
// 触发分页事件
const handleChange = (val) => {
  emit('handleSizeChange', val.pageSize) // 设置每页条数
  emit('handleCurrentChange', val.current) // 当前页数
}
// 搜索
const handleSearch = () => {
  emit('gitList')
}
// 清空搜索数据
const onClear = () => {
  ruleForm.value.reset() // 清除表单
  emit('gitList')
}
</script>
