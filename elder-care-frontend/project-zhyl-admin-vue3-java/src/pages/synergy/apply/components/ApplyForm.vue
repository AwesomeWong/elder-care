<!-- 申请退住 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :label-width="88"
      on-cancel="onClickCloseBtn"
      :reset-type="resetType"
      @reset="onClickCloseBtn"
    >
      <t-card title="基本信息">
        <t-form-item label="老人姓名：" name="name">
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
        <t-form-item label="老人身份证号：" class="label-wt" name="idCardNo">
          <t-input
            v-model="formData.idCardNo"
            placeholder="老人身份证号"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="联系方式：" name="phone">
          <t-input
            v-model="formData.phone"
            placeholder="联系方式"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="费用期限：" class="label-wt">
          <t-input
            v-model="checkInTime"
            placeholder="费用期限"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="护理等级：" name="nursingLevelName">
          <t-input
            v-model="formData.nursingLevelName"
            placeholder="护理等级"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="入住床位：" class="label-wt" name="bedNo">
          <t-input
            v-model="formData.bedNo"
            placeholder="入住床位"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="签约合同：" name="contractName">
          <t-input
            v-model="formData.contractName"
            placeholder="签约合同"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="养老顾问：" class="label-wt" name="counselor">
          <t-input
            v-model="formData.counselor"
            placeholder="养老顾问"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="护理员：" name="nursingName">
          <t-input
            v-model="formData.nursingName"
            placeholder="护理员"
            class="wt-300"
            :disabled="true"
          >
          </t-input>
        </t-form-item>
      </t-card>
      <!-- 申请信息 -->
      <t-card title="申请信息">
        <t-form-item label="退住日期：" name="checkOutTime">
          <t-date-picker
            v-model="formData.checkOutTime"
            placeholder="请选择"
            class="wt-300"
          />
        </t-form-item>
        <t-form-item label="退住原因：" name="reason">
          <t-select
            v-model="formData.reason"
            clearable
            filterable
            placeholder="请选择"
            class="wt-300"
          >
            <t-option
              v-for="(item, index) in quitCauseData"
              :key="index"
              :value="item.value"
              :label="item.value"
              title=""
            >
              {{ item.value }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="备注：" name="remark" class="lastText">
          <t-textarea
            v-model="formData.remark"
            placeholder="请输入"
            class="t-textarea"
            name="description"
            :maxlength="100"
            clearable
            @change="handleTextSlice"
          >
            <template #suffix>
              <span class="nickname">
                <span>{{ formData.remark ? formData.remark.length : 0 }}</span
                >/100</span
              >
            </template>
          </t-textarea>
        </t-form-item>
      </t-card>
      <!-- end -->
    </t-form>
    <!-- end -->
  </div>
  <!-- 老人选择弹层 -->
  <OldManSelect
    :dialog-visible="dialogVisible"
    :dialog-data="listOldManData"
    :pagination="pagination"
    :formData="formData"
    @handle-search="handleSearch"
    @handle-reset="handleReset"
    @handle-close-dialog="handleCloseDialog"
    @get-current="getCurrent"
    @handle-select-old="handleSelectOld"
  ></OldManSelect>
  <!-- end -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { validateTextLen } from '@/utils/validate'
import { getDateInfo } from '@/utils/date'
// 基本数据
import { quitCauseData } from '@/utils/commonData'
// 接口
import { getSelectListByPage } from '@/api/oldMan'

// 选择老人列表弹层
import OldManSelect from './OldManSelect.vue'

// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const mak = ref(false) // 控制input上下箭头
const readonly = ref(false) // 是否只读
const dialogVisible = ref(false) // 老人选择弹窗
const listOldManData = ref([]) // 获取所有老人
const pagination = ref<Object | any>({
  pageSize: 5,
  pageNum: 1 // 默认当前页
})
const checkInTime = ref('') // 弹层列表数据
// 表单数据
const formData = ref<Object | any>({
  checkOutTime: new Date()
})
// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '老人姓名为空，请选择老人姓名',
      type: 'error',
      trigger: 'change'
    }
  ],
  checkOutTime: [
    {
      required: true,
      message: '退住日期为空，请选择退住日期',
      type: 'error',
      trigger: 'change'
    }
  ],
  reason: [
    // 房间校验
    {
      required: true,
      message: '退住原因为空，请选择退住原因',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// -----定义方法------
onMounted(() => {
  if (props.baseData.retreat) {
    formData.value = props.baseData.retreat
    checkInTime.value = `${getDateInfo(
      formData.value.checkInStartTime
    )}~${getDateInfo(formData.value.checkInEndTime)}`
  }
})
// 获取老人列表数据
const getOldList = async () => {
  const res: any = await getSelectListByPage(pagination.value) // 获取列表数据
  if (res.code === 200) {
    listOldManData.value = res.data.records
    pagination.value.total = Number(res.data.total)
  }
}
// 搜索功能
const handleSearch = () => {
  pagination.value.pageNum = 1
  getOldList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  pagination.value = {
    pageSize: 5,
    pageNum: 1
  }
  getOldList()
}
// 选择老人获取相关联的信息
const selectFlavor = () => {
  mak.value = true
  readonly.value = true
  dialogVisible.value = true
  getOldList()
}
const outSelect = (e) => {
  setTimeout(function () {
    mak.value = false
    readonly.value = false
  }, 200)
}
// 清除表单数据
const handleClear = () => {
  // 重置表单
  formData.value.checkOutTime = new Date()
}
// 点击取消关闭
const onClickCloseBtn = () => {
  handleClear()
}

// 字数限制
const handleTextSlice = () => {
  const num = 100
  if (formData.value.remark.length > num) {
    const value = validateTextLen(formData.value.remark, num)
    formData.value.remark = value
  }
}
// 关闭普通列表弹层
const handleCloseDialog = () => {
  dialogVisible.value = false
  pagination.value = {
    pageSize: 5,
    pageNum: 1
  }
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getOldList()
}
// 提交普通列表弹层
const handleSelectOld = (val) => {
  const obj = val[0]
  formData.value.name = obj.name
  formData.value.bedNo = obj.bedNo
  formData.value.checkInEndTime = obj.checkInEndTime
  formData.value.checkInStartTime = obj.checkInStartTime
  checkInTime.value = `${getDateInfo(obj.checkInStartTime)}~${getDateInfo(
    obj.checkInEndTime
  )}`
  formData.value.contractName = obj.contractName
  formData.value.contractUrl = obj.contractUrl
  formData.value.contractNo = obj.contractNo
  formData.value.counselor = obj.counselor
  formData.value.nursingName = obj.nursingName
  formData.value.id = obj.id
  formData.value.elderId = obj.elderId
  formData.value.idCardNo = obj.idCardNo
  formData.value.phone = obj.phone
  formData.value.nursingLevelName = obj.nursingLevelName
}
// 向父组件暴露数据与方法
defineExpose({
  form,
  formData,
  handleClear
})
</script>
