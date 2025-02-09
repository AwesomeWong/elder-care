<!--查看欠费账单-->
<template>
  <div class="dialogBox tableDialog scrollTable">
    <t-dialog
      v-model:visible="visible"
      header="查看欠费账单"
      :on-close="handleClose"
      :on-confirm="handleSubmit"
      :footer="false"
      @close-btn-click="handleClose"
    >
      <div>
        <!-- table 数据 -->
        <div
          class="scrollTable"
          :class="showPageTip ? 'heighta' : 'dialogHeight'"
        >
          <t-table
            id="app"
            ref="tableRef"
            row-key="id"
            :data="listData"
            :columns="COLUMNS2"
            :hover="true"
            :scroll="{ type: 'virtual', rowHeight: 48, bufferSize: 10 }"
            :height="data.length < 6 ? null : 380"
            :async-loading="loadingNode"
            :disable-data-page="pagination.total <= 10"
            @scroll="handleScroll($event)"
          >
            <!-- 序号 -->
            <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
            <!-- end -->
            <!-- 金额 -->
            <template #payableAmount="{ row }">
              {{
                isDecimals(row.payableAmount)
                  ? row.payableAmount
                  : row.payableAmount + '.00'
              }}
            </template>
            <!-- end -->
          </t-table>
        </div>
        <div v-if="showPageTip" class="footInfo">已经到底了~</div>
        <!-- end -->
      </div>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { COLUMNS2 } from '../constants'
import { getBillList } from '@/api/finance'
import { isDecimals } from '@/utils/validate'
// 获取父组件值、方法
const props = defineProps({
  // 获取列表数据
  data: {
    type: Array,
    default: () => []
  },
  // 弹层隐藏显示
  dialogVisible: {
    type: Boolean,
    default: false
  },
  elderName: {
    type: String,
    default: ''
  }
})
// ------定义变量------
const emit = defineEmits(['handleClose', 'getPages', 'handleSubmit', 'gitList']) // 子组件获取父组件事件传值
const tableRef = ref(null) // 定义表格ref
const visible = ref(false) // 用来控制弹层显示隐藏
const fixedTopAndBottomRows = ref(false)
const pageNume = ref(1) // 当前页
const showPageTip = ref(false) // 数据到底了提示
const asyncLoading = ref('loading-custom')
const listData = ref([])
const pages = ref(0) // 总页数
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1,
  transactionStatus: -1
})
const customLoadingNode = (h) => {
  return `已经到底了`
}
const loadingNode = computed(() =>
  asyncLoading.value === 'loading-custom'
    ? customLoadingNode
    : asyncLoading.value
)
// 监听弹层是显示还是隐藏
watch(
  () => props.dialogVisible,
  (newVal) => {
    visible.value = newVal
    if (newVal) {
      pagination.value.elderName = props.elderName
      getBill()
    }
  }
)
// ------生命周期------
const handleScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.e.target
  if (scrollTop + clientHeight === scrollHeight) {
    // 判断是否全部加载完成
    if (pageNume.value >= pages.value) {
      asyncLoading.value = 'loading-custom'
      showPageTip.value = true
      fixedTopAndBottomRows.value = true
    }
  } else {
    if (pageNume.value < pages.value) {
      // 当前页数小于总页数就请求
      pageNume.value++ // 当前页数自增
      pagination.value.pageNum = pageNume.value
      getBill()
    } else {
      pageNume.value = pages.value
      return false
    }

    asyncLoading.value = null
    showPageTip.value = false
    fixedTopAndBottomRows.value = false
  }
}
// ------定义方法------
// 获取列表数据
const getBill = async () => {
  const res: any = await getBillList(pagination.value) // 获取列表数据
  const items = res.data.records == null ? [] : res.data.records
  // 从第一页请求 清空之前的数据
  // listData.value = pagination.value.pageNum === 1 ? [] : null
  // 下拉数据合并
  listData.value =
    listData.value.length > 0 ? [...listData.value, ...items] : items

  pages.value = Number(res.data.pages)
  if (pages.value === pageNume.value) {
    showPageTip.value = false
    fixedTopAndBottomRows.value = false
  }
}
// 关闭弹层
const handleClose = () => {
  pageNume.value = 0
  pagination.value.pageNum = 1
  listData.value = []
  emit('handleClose')
}
</script>
