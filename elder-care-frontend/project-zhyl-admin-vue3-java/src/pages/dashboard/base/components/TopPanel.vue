<template>
  <t-row :gutter="24">
    <t-col :xs="12" :xl="9">
      <t-card title="">
        <template #title>
          <div class="tit">
            <span>数据概览</span
            ><span class="time">数据更新：{{ newDate }}</span>
          </div>
        </template>
        <div class="dataCon">
          <div
            id="oldContainer"
            ref="oldContainer"
            class="dashboard-chart-container"
          />
          <div
            id="bedContainer"
            ref="bedContainer"
            class="dashboard-chart-container"
          />
          <div
            id="serveContainer"
            ref="serveContainer"
            class="dashboard-chart-container"
          />
          <div
            id="staffContainer"
            ref="staffContainer"
            class="dashboard-chart-container"
          />
          <div
            id="moneyContainer"
            ref="moneyContainer"
            class="dashboard-chart-container"
          />
        </div>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="3">
      <t-card title="">
        <div class="roleCon">
          <div class="head">
            <div class="img">
              <img :src="baseData.avatar ? baseData.avatar : avatar" />
            </div>
            <div class="rText">
              <p>Hello！{{ baseData.realName }}</p>
              <p>今天也是元气满满的一天！</p>
            </div>
          </div>
          <div class="userInfo">
            <p><i class="icon1"></i>{{ baseData.email }}</p>
            <p>
              <i class="icon2"></i>
              <span v-if="roleListData.length > 0" class="textOverflow"
                ><t-tooltip :content="roleListData" show-arrow>
                  <span>{{ roleListData }}</span>
                </t-tooltip></span
              >
              <span v-else>{{ roleListData }}</span>
            </p>
            <p><i class="icon3"></i>{{ baseData.post }}</p>
            <p><i class="icon4"></i>{{ baseData.dept }}</p>
          </div>
          <div class="hFoot">
            <div class="fTit">下属员工</div>
            <ul class="imgItem">
              <li>
                <span><img src="../../../../assets/img1.png" /></span>
              </li>
              <li>
                <span><img src="../../../../assets/img2.png" /></span>
              </li>
              <li>
                <span><img src="../../../../assets/img3.png" /></span>
              </li>
              <li>
                <span><img src="../../../../assets/img4.png" /></span>
              </li>
              <li>
                <span><img src="../../../../assets/img5.png" /></span>
              </li>
              <li>
                <span><img src="../../../../assets/img6.png" /></span>
              </li>
              <li><span>+3</span></li>
            </ul>
          </div>
        </div>
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'

import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { PieChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useSettingStore } from '@/store'
import { getDateInfo, getMonthInfo } from '@/utils/date'
import {
  OLDMAN_NUM_A,
  OLDMAN_NUM_B,
  OLDMAN_NUM_C,
  BED_NUM_A,
  BED_NUM_B,
  BED_NUM_C,
  SERVE_NUM_A,
  SERVE_NUM_B,
  SERVE_NUM_C,
  STAFF_NUM_A,
  STAFF_NUM_B,
  STAFF_NUM_C,
  MONEY_NUM_A,
  MONEY_NUM_B,
  MONEY_NUM_C
} from '../constants'
import {
  getOldPieChartDataSet,
  getBedPieChartDataSet,
  getservePieChartDataSet,
  getStaffPieChartDataSet,
  getMoneyPieChartDataSet
} from '../index'

const avatar = ref(
  'https://yjy-oss-videos.oss-accelerate.aliyuncs.com/grzxhz.jpg'
)
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  GridComponent,
  LineChart,
  CanvasRenderer
])

const store = useSettingStore()
const newDate = getDateInfo(new Date())
const chartColors = computed(() => store.chartColors)
// 获取父组件值、方法
const props = defineProps({
  // 搜索对象
  baseData: {
    type: Object,
    default: () => ({})
  },
  roleListData: {
    type: String,
    default: ''
  }
})
// monitorChart
let oldContainer: HTMLElement // 老人
let bedContainer: HTMLElement // 床位
let serveContainer: HTMLElement // 服务
let staffContainer: HTMLElement // 员工
let moneyContainer: HTMLElement // 收入
let countChart: echarts.ECharts
// 老人数量
const oldNumData = ref(OLDMAN_NUM_A)
const bedNumData = ref(BED_NUM_A)
const serveNumData = ref(SERVE_NUM_A)
const staffNumData = ref(STAFF_NUM_A)
const moneyNumData = ref(MONEY_NUM_A)
const renderCountChart = () => {
  if (!oldContainer) {
    oldContainer = document.getElementById('oldContainer')
  }
  countChart = echarts.init(oldContainer)
  countChart.setOption(
    getOldPieChartDataSet((chartColors as any).value, oldNumData.value)
  )
}
// 床位数量
const bedCountChart = () => {
  if (!bedContainer) {
    bedContainer = document.getElementById('bedContainer')
  }
  countChart = echarts.init(bedContainer)
  countChart.setOption(
    getBedPieChartDataSet((chartColors as any).value, bedNumData.value)
  )
}
// 服务数量
const serveCountChart = () => {
  if (!serveContainer) {
    serveContainer = document.getElementById('serveContainer')
  }
  countChart = echarts.init(serveContainer)
  countChart.setOption(
    getservePieChartDataSet((chartColors as any).value, serveNumData.value)
  )
}
// 员工数量
const staffCountChart = () => {
  if (!staffContainer) {
    staffContainer = document.getElementById('staffContainer')
  }
  countChart = echarts.init(staffContainer)
  countChart.setOption(
    getStaffPieChartDataSet((chartColors as any).value, staffNumData.value)
  )
}
// 收入金额
const moneyCountChart = () => {
  if (!moneyContainer) {
    moneyContainer = document.getElementById('moneyContainer')
  }
  countChart = echarts.init(moneyContainer)
  countChart.setOption(
    getMoneyPieChartDataSet((chartColors as any).value, moneyNumData.value)
  )
}
const renderCharts = () => {
  renderCountChart()
  bedCountChart()
  serveCountChart()
  staffCountChart()
  moneyCountChart()
}

onMounted(() => {
  // 3套数据3天出现一次
  const date = getMonthInfo(new Date())
  const num = (date.surplusDay + 1) % 3
  if (num === 1) {
    oldNumData.value = OLDMAN_NUM_A
    bedNumData.value = BED_NUM_A
    serveNumData.value = SERVE_NUM_A
    staffNumData.value = STAFF_NUM_A
    moneyNumData.value = MONEY_NUM_A
  } else if (num === 2) {
    oldNumData.value = OLDMAN_NUM_B
    bedNumData.value = BED_NUM_B
    serveNumData.value = SERVE_NUM_B
    staffNumData.value = STAFF_NUM_B
    moneyNumData.value = MONEY_NUM_B
  } else {
    oldNumData.value = OLDMAN_NUM_C
    bedNumData.value = BED_NUM_C
    serveNumData.value = SERVE_NUM_C
    staffNumData.value = STAFF_NUM_C
    moneyNumData.value = MONEY_NUM_C
  }
  renderCharts()
})
</script>

<style lang="less" scoped>
.dashboard-chart-card {
  padding: 8px;

  :deep(.t-card__header) {
    padding-bottom: 24px;
  }

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
