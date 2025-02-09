<!-- 床位列表页 -->
<template>
  <div class="min-h bg-wt pd-main br-2 smartBed">
    <!-- 楼层tab导航 -->
    <SwitchBar
      ref="tabBar"
      :data="tabData"
      :route-type="routeType"
      @change-id="getFloorId"
    ></SwitchBar>
    <!-- end -->
    <!-- 房型列表 -->
    <HouseList
      :base-data="roomVoList"
      :floor-data="tabData"
      :route-type="routeType"
    ></HouseList>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'

// 接口
import { getAllByFloorSmartBed, getFloorBySmartBed } from '@/api/liveIn'
// 组件
// tab切换
import SwitchBar from './components/SwitchBartop.vue'

// 房型列表
import HouseList from './components/List.vue'

// 床位添加编辑弹层
// ------定义变量------
const route = useRoute() // 获取局部
const userStore = useUserStore()
// 楼层变量
const tabBar = ref(null) // 楼层的ref
const tabData = ref([]) // 定义tab切换数据
const roomVoList = ref([])
const floorId = ref('') // 楼层id
const floorIndex = ref(null)
// 房间变量
const dataLoading = ref(false) // 加载loading
const routeType = ref(null)
// 获取全部数据
const allData = ref([])
const timerId = ref(null)
const socket = ref(null)

onUnmounted(() => {
  clearInterval(timerId.value)
})
// 默认加载数据
onMounted(() => {
  if (route.query.type !== undefined) {
    routeType.value = route.query.type
  }
  getAllFloorList()
  // 在一个楼层，每个楼层下都有一个接口获取该楼层下的数据，然后每隔5秒自动执行获取一次数据，但是如果5秒后所在的楼层和当前的楼层不是同一个，则不执行
  timerId.value = setInterval(() => {
    if (userStore.floorId === floorId.value) {
      getList()
      console.log(userStore.floorId, floorId.value, '触发')
    } else {
      userStore.floorId = floorId.value
      console.log(userStore.floorId, floorId.value, '不触发')
    }
  }, 60000)
  const clientId = Math.random().toString(36).substr(2)
  // const env = import.meta.env.MODE || 'development'
  console.log(import.meta.env, 'MODE')
  console.log(import.meta.env.VITE_APP_SOCKET_URL, 'MODE')
  // socket.value = new WebSocket(`wss://zhyl-admin-t.itheima.net/ws/${clientId}`)
  socket.value = new WebSocket(
    `${import.meta.env.VITE_APP_SOCKET_URL}/ws/${clientId}`
  )
  socket.value.onmessage = (event) => {
    console.log('收到消息:', event.data)
    userStore.setUnusualFloorId(event.data)
  }
})
// ------定义方法------
// 获取楼层数据
const getAllFloorList = async () => {
  const res: any = await getFloorBySmartBed()
  allData.value = res.data
  if (res.code === 200) {
    tabData.value = res.data
    // 首次进来需要拿楼层第一条数据的id来获取当前数据
    if (floorId.value === '' && tabData.value.length) {
      floorId.value = tabData.value[0].id
      userStore.floorId = tabData.value[0].id
    }
    getList()
  }
}
// 根据不同的楼层id楼层信息
const getList = async () => {
  dataLoading.value = true
  try {
    const res: any = await getAllByFloorSmartBed(floorId.value)
    if (res.code === 200) {
      roomVoList.value = res.data
    }
  } finally {
    dataLoading.value = false
  }
}
// 获取楼层id
const getFloorId = (id, i) => {
  // 点击异常楼层后消除对应的红点异常
  userStore.deleteUnusualFloorId(id)
  userStore.floorId = floorId.value
  floorIndex.value = i
  floorId.value = id
  getList()
}
</script>
<style lang="less" src="../../index.less"></style>
<style lang="less" scoped>
.smartBed {
  min-height: calc(100vh - 130px);
}
</style>
