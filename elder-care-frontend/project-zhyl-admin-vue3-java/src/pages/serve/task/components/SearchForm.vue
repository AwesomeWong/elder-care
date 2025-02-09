<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="98">
      <t-row>
        <t-col>
          <t-form-item label="老人姓名：" name="elderName">
            <t-input
              v-model="searchData.elderName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('elderName')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="护理员姓名：" name="nurseId">
            <!-- <t-input
              v-model="searchData.nurseName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('nurseName')"
            /> -->
            <t-select
              v-model="searchData.nurseId"
              class="wt-400"
              placeholder="请输入"
              clearable
              filterable
              :max="4"
            >
              <t-option
                v-for="(item, index) in nurseList"
                :key="index"
                :value="item.id"
                :label="item.realName"
                title=""
              >
                {{ item.realName }}
              </t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="护理项目：" name="projectId">
            <t-select
              v-model="searchData.projectId"
              clearable
              filterable
              placeholder="请选择"
              @clear="handleClear('projectId')"
            >
              <t-option
                v-for="(item, index) in projectData"
                :key="index"
                :value="item.id"
                :label="item.name"
                title=""
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="期望服务时间：" name="timeData">
            <t-date-range-picker
              v-model="timeData"
              :placeholder="['开始日期', '结束日期']"
              clearable
              @change="handleDate"
            />
          </t-form-item>
        </t-col>
        <!-- 按钮区域 -->
        <t-col class="searchBtn">
          <button type="button" class="bt-grey wt-60" @click="handleReset()">
            重置
          </button>
          <button type="button" class="bt wt-60" @click="handleSearch()">
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllUserList } from '@/api/permission'
// 获取父组件值、方法
defineProps({
  // 搜索对象
  searchData: {
    type: Object,
    default: () => ({})
  },
  projectData: {
    type: Object,
    default: () => ({})
  }
})
const timeData = ref([]) // 时间选择
// 护理员下拉数据
const nurseList = ref([])
// 触发父组件的方法
const emit: Function = defineEmits([
  'handleSearch',
  'handleReset',
  'handleClear'
])
const form = ref(null)
onMounted(async () => {
  const res: any = await getAllUserList({ deptNo: '100001008000000' })
  nurseList.value = res.data
})
// 重置表单
const handleReset = () => {
  form.value.reset()
  timeData.value = []
  emit('handleReset')
}
// 搜索表单
const handleSearch = () => {
  emit('handleSearch', timeData.value)
}
const handleDate = (value) => {
  if (!value.length) {
    emit('handleClear', 'time')
  } else {
    timeData.value = [`${value[0]} 00:00:00`, `${value[1]} 23:59:59`]
  }
}
// 清空
const handleClear = (v) => {
  emit('handleClear', v)
}
</script>
