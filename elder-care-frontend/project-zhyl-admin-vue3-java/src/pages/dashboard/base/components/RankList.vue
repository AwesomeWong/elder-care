<template>
  <t-row :gutter="24" class="row-container">
    <t-col :xs="12" :xl="7">
      <t-card title="待办事项" class="dashboard-rank-card">
        <div class="backlogCon">
          <ul>
            <li v-for="(item, index) in backlogData" :key="index">
              <div class="con">
                <p class="head">
                  <span class="typeIcon" :class="'icon' + item.type">{{
                    item.type === 3 ? '入住' : '退住'
                  }}</span
                  >{{ item.num }}{{ item.title }}
                </p>
                <p class="time">
                  <span>申请人：{{ item.name }}</span
                  ><span>申请时间：{{ item.date }}</span>
                </p>
              </div>
              <span class="btn">审批</span>
            </li>
          </ul>
        </div>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="5">
      <t-card title="" class="dashboard-rank-card">
        <template #title>
          <div class="timeTie">
            <div>预约总览</div>
            <div>
              <span class="goToday" @click="goToday">回到今日</span
              >{{ selectTime }}
            </div>
          </div>
        </template>
        <div class="dateSelete">
          <span
            class="pre"
            :class="isToday ? 'forbidActive' : ''"
            @click="getPreWeek"
          ></span>
          <span class="next" @click="getNextWeek"></span>
          <ul>
            <li v-for="(item, index) in dataObj" :key="index">
              <p>
                <span>{{ item.week }}</span>
              </p>
              <p @click="handleDay(item, index)">
                <span :class="dayActive === index ? 'dayActive' : ''">{{
                  item.day
                }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="subscribeCon">
          <ul>
            <li v-for="(item, index) in subscribeData" :key="index">
              <span
                class="typeIcon"
                :class="item.type === 1 ? 'icon3' : 'icon1'"
                >{{ item.type === 1 ? '参观' : '预约' }}</span
              >
              <span class="time">{{ item.time }}</span>
              <span>预约人：{{ item.name }}</span>
              <span>手机号：{{ item.phone }}</span>
            </li>
          </ul>
        </div>
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
// 导入样式
import { onMounted, ref } from 'vue'
import { getWeekDate, getDateInfo, getMonthInfo } from '@/utils/date'
import {
  BACKLOG_DATA_A,
  BACKLOG_DATA_B,
  BACKLOG_DATA_C,
  SUBSCRIBE_DATA
} from '../constants'

const dataObj = ref([])
const isToday = ref(false)
const selectTime = ref('')
const dayActive = ref(0)
const subscribeData = ref([]) // 触发每天的数据
const subDataArr = ref([]) // 一月的数据
const backlogData = ref(BACKLOG_DATA_A) // 待办事项
onMounted(() => {
  // 设置一周的日期
  dataObj.value = getWeekDate({ baselineDate: new Date() })
  selectTime.value = time()
  subDataArr.value = [...SUBSCRIBE_DATA, ...SUBSCRIBE_DATA]
  subscribeData.value = subDataArr.value[0]
  isChick(dataObj.value)
  // 3套数据3天出现一次
  const date = getMonthInfo(new Date())
  const num = (date.surplusDay + 1) % 3
  if (num === 1) {
    backlogData.value = BACKLOG_DATA_A
  } else if (num === 2) {
    backlogData.value = BACKLOG_DATA_B
  } else {
    backlogData.value = BACKLOG_DATA_C
  }
})
// 是否可以触发上一周
const isChick = (date) => {
  const today = time()
  const selectDate = date[0].dateStr
  const todayStr = new Date(today).getTime()
  const selectStr = new Date(selectDate).getTime()
  if (selectStr <= todayStr) {
    isToday.value = true
  } else {
    isToday.value = false
  }
  // 是否与当前时间相等，设置天的当前状态与要显示的数据
  dataObj.value.forEach((obj, i) => {
    if (obj.dateStr === selectTime.value) {
      dayActive.value = i
      subscribeData.value = subDataArr.value[obj.day]
    }
    // 如果上一页不能触发了，显示当前的时间
    if (isToday.value) {
      selectTime.value = time()
      subscribeData.value = subDataArr.value[obj.day]
    }
  })
}
// 上一周
const getPreWeek = () => {
  // 获取以当天为基准日期的下星期数据
  if (!isToday.value) {
    dayActive.value = 0
    dataObj.value = getWeekDate({
      baselineDate: new Date(dataObj.value[0].dateStr),
      range: -7
    })
    selectTime.value = dataObj.value[0].dateStr
    isChick(dataObj.value)
  }
}
// 下一周
const getNextWeek = () => {
  dayActive.value = 0
  // 获取以当天为基准日期的下星期数据
  dataObj.value = getWeekDate({
    baselineDate: new Date(dataObj.value[0].dateStr),
    range: 7
  })

  isChick(dataObj.value)
  selectTime.value = dataObj.value[0].dateStr // 把一周的第一天设置为当前日期
  subscribeData.value = subDataArr.value[dataObj.value[0].day]
}
// 触发当天显示的数据
const handleDay = (item, i) => {
  dayActive.value = i
  selectTime.value = item.dateStr
  subscribeData.value = subDataArr.value[item.day]
}
// 回到今天
const goToday = () => {
  dataObj.value = getWeekDate({ baselineDate: new Date() })
  isChick(dataObj.value)
}
// 当前时间
const time = () => {
  return getDateInfo(new Date())
}
</script>
