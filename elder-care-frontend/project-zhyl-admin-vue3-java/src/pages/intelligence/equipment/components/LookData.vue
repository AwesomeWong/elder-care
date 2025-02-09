<!--查看数据弹窗+分页-->
<template>
  <div class="dialogBox tableDialog lookSelectDialog">
    <t-dialog
      v-model:visible="visible"
      header="查看数据"
      :on-close="handleClose"
      :footer="false"
      @close-btn-click="handleClose"
    >
      <div class="dialogCenter">
        <!-- 搜索 -->
        <t-form ref="ruleForm" :data="pagination" :label-width="80">
          <t-row>
            <t-col :span="12">
              <t-row>
                <t-col :span="8">
                  <t-form-item label="时间范围：" name="name">
                    <t-select
                      v-model="timeValue"
                      filterable
                      placeholder="请选择"
                      @change="handleTime"
                    >
                      <t-option
                        v-for="(item, index) in timeData"
                        :key="index"
                        :value="item.id"
                        :label="item.value"
                        title=""
                      ></t-option>
                    </t-select>
                    <t-date-range-picker
                      v-if="typeValue === 3"
                      v-model="time"
                      :placeholder="['开始日期', '结束日期']"
                      clearable
                      @change="handleDate"
                    />
                  </t-form-item>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </t-form>
        <!-- end -->
        <!-- table 数据 -->
        <t-table
          ref="regTable"
          row-key="rowKey"
          :data="dialogData"
          :columns="LOOKCOLUMNS"
          :pagination="pagination.total > 5 ? pagination : null"
          :disable-data-page="pagination.total <= 5"
          :loading="dataLoading"
          cell-empty-content="-"
          @page-change="onPageChange"
        >
          <!-- 序号 -->
          <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
          <!-- end -->
          <!-- 时间 -->
          <template #time="{ row }">
            <span>{{
              row.time !== undefined ? getTimestamp(row.time) : '--'
            }}</span>
          </template>
          <!-- end -->
          <!-- 暂无数据 -->
          <template #empty>
            <NoData></NoData>
          </template>
          <!-- end -->
        </t-table>
        <!-- end -->
      </div>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { getTimestamp } from '@/utils/date'
import { LOOKCOLUMNS } from '../constants'
import { timeData } from '@/utils/commonData'
import { getNum } from '@/utils/validate'
// 组件
import NoData from '@/components/noData/index.vue'
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
  // 分页
  pagination: {
    type: Object,
    default: () => ({})
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
const emit = defineEmits(['handleCloseDialog', 'getCurrent', 'handleSearch']) // 子组件获取父组件事件传值
const regTable = ref() // 定义表格ref
const ruleForm = ref(null) // 定义表单ref
const visible = ref(false) // 用来控制弹层显示隐藏
const time = ref([])
const timeValue = ref(0)
const typeValue = ref(0) // 时间筛选索引
// 行的key
const rowKey = 'index'
// 监听弹层是显示还是隐藏
watch(props, (val) => {
  visible.value = val.dialogVisible
})
// ------定义方法------
// 关闭弹层
const handleClose = () => {
  ruleForm.value.reset() // 清除表单
  timeValue.value = 0
  typeValue.value = 0
  time.value = []
  emit('handleCloseDialog')
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 时间筛选、自定义除外
const handleTime = (val) => {
  typeValue.value = val

  if (val < 3) {
    const data = timeData.filter((user) => user.id === val)
    emit('handleSearch', getNum(data[0].value))
    time.value = []
  }
}
// 日期筛选数据
const handleDate = (val) => {
  emit('handleSearch', val)
}
</script>
