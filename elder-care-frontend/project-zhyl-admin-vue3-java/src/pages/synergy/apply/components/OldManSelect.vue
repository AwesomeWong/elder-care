<!--添加老人选择老人弹层-->
<template>
  <div class="dialogBox tableDialog oldSelectDialog">
    <t-dialog
      v-model:visible="visible"
      header="选择老人"
      :on-close="handleClose"
      :on-confirm="handleSub"
      :footer="false"
      @close-btn-click="handleClose"
    >
      <div class="dialogCenter">
        <!-- 搜索 -->
        <t-form ref="ruleForm" :data="pagination" :label-width="80">
          <t-row>
            <t-col :span="12">
              <t-row>
                <t-col :span="4">
                  <t-form-item label="老人姓名：" name="name">
                    <t-input
                      v-model="pagination.name"
                      class="form-item-content"
                      clearable
                      type="search"
                      placeholder="请输入"
                    />
                  </t-form-item>
                </t-col>
                <t-col :span="5">
                  <t-form-item
                    label="老人身份证号："
                    name="idCardNo"
                    class="label-wt"
                  >
                    <t-input
                      v-model="pagination.idCardNo"
                      class="form-item-content"
                      clearable
                      type="search"
                      placeholder="请输入"
                    />
                  </t-form-item>
                </t-col>
                <t-col :span="3">
                  <!-- 按钮区域 -->
                  <div class="searchBtn">
                    <button class="bt-grey wt-60" @click="handleReset()">
                      重置
                    </button>
                    <button class="bt wt-60" @click="handleSearch()">
                      搜索
                    </button>
                  </div>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </t-form>
        <!-- end -->
        <!-- table 数据 -->
        <t-table
          ref="regTable"
          row-key="elderId"
          :data="dialogData"
          :columns="COLUMNS"
          :pagination="pagination.total > 5 ? pagination : null"
          :disable-data-page="pagination.total <= 5"
          :loading="dataLoading"
          cell-empty-content="-"
          :selected-row-keys="selectedRowKeys"
          @page-change="onPageChange"
          @select-change="handleChangeSelection"
        >
          <!-- 序号 -->
          <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
          <!-- end -->
          <!-- 暂无数据 -->
          <template #empty>
            <NoData></NoData>
          </template>
          <!-- end -->
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
            @click="handleSub"
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
import { ref, reactive, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { COLUMNS } from './constants'
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
  },
  // 基本信息
  formData: {
    type: Object,
    default: () => ({})
  }
})
// ------定义变量------
const emit = defineEmits([
  'handleCloseDialog',
  'getCurrent',
  'gitList',
  'handleSelectOld',
  'handleSearch',
  'handleReset'
]) // 子组件获取父组件事件传值
const regTable = ref() // 定义表格ref
const ruleForm = ref(null) // 定义表单ref
const visible = ref(false) // 用来控制弹层显示隐藏
const selectedRowKeys = ref([]) // 选中的数据
const checkTabData = reactive<Object | any>({}) // 选中的list
// 监听弹层是显示还是隐藏
watch(props, (val) => {
  visible.value = val.dialogVisible
  if (visible.value) {
    // 回显选中的老人
    if (val.formData.elderId !== undefined) {
      selectedRowKeys.value = [val.formData.elderId]
    }
  }
})
// ------定义方法------
// 确认提交
const handleSub = async () => {
  // checkTabData.value是选择的内容传给父组件
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.error('未选择老人，请选择老人信息')
  } else {
    emit('handleSelectOld', checkTabData.value)
    handleClose()
  }
}
// 关闭弹层
const handleClose = () => {
  ruleForm.value.reset() // 清除表单
  selectedRowKeys.value = []
  emit('handleCloseDialog')
}
// 触发复选框
const handleChangeSelection = (index, { selectedRowData }) => {
  selectedRowKeys.value = index
  checkTabData.value = selectedRowData
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 搜索
const handleSearch = () => {
  emit('handleSearch')
}
// 清空搜索数据
const handleReset = () => {
  ruleForm.value.reset() // 清除表单
  emit('handleReset')
}
</script>
