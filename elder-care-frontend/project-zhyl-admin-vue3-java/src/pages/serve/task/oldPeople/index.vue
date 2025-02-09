<!-- 床位列表页 -->
<template>
  <div class="min-h bg-wt pd-main br-2">
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
      @handleCheck="handleRoomCheck"
      @handleSelectOlder="handleSelectOlder"
      @handleSingleOlder="handleSingleOlder"
    ></HouseList>
    <!-- 查看房间 -->
    <CheckRoom
      ref="formRef"
      :visible="checkVisible"
      :data="nurseList"
      :singleNurse="singleNurse"
      @handle-close="handleCheckRoomClose"
      @handle-submit="handleSubmit"
    ></CheckRoom>
    <!-- end -->
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'
// 接口
import { getFloorByOldPeople, getAllByFloorOldPeople } from '@/api/liveIn'
import { getAllUserList } from '@/api/permission'
import { setNurseForOlder } from '@/api/serve'
// 组件
// tab切换
import SwitchBar from './components/SwitchBartop.vue'

// 房型列表
import HouseList from './components/List.vue'
// 查看房间弹层
import CheckRoom from './components/CheckRoom.vue'
// 床位添加编辑弹层
// ------定义变量------
const userStore = useUserStore()
const route = useRoute() // 获取局部
// 楼层变量
const tabBar = ref(null) // 楼层的ref
const tabData = ref([]) // 定义tab切换数据
const roomVoList = ref([])
const floorId = ref('') // 楼层id
const floorIndex = ref(null)
// 房间变量
const checkVisible = ref(false) // 查看房间弹层显示/隐藏
const dataLoading = ref(false) // 加载loading

const routeType = ref(null)

// 设置护理员的老人
const selectOlder = ref([])
const singleNurse = ref([])
const formRef = ref(null)

// 护理员下拉数据
const nurseList = ref([])
// 默认加载数据
onMounted(() => {
  if (route.query.type !== undefined) {
    routeType.value = route.query.type
  }
  getAllFloorList()
  getAllUserListFunc()
})
// ------定义方法------
// 获取单个设置老人的护理人数据
const handleSingleOlder = (val) => {
  singleNurse.value = val
}
// 获取要设置的老人数据
const handleSelectOlder = (val) => {
  selectOlder.value = val
}
// 给老人设置护理员
const handleSubmit = async (val) => {
  const params = selectOlder.value.map((item) => {
    return { elderId: item.elderId, nursingIds: val }
  })
  const res: any = await setNurseForOlder(params)
  if (res.code === 200) {
    MessagePlugin.success('设置成功')
    getAllFloorList()
    handleCheckRoomClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 获取护理员下拉数据
const getAllUserListFunc = async () => {
  const res: any = await getAllUserList({ deptNo: '100001005000000' })
  nurseList.value = res.data
}
// 获取楼层数据
const getAllFloorList = async () => {
  const res: any = await getFloorByOldPeople()
  if (res.code === 200) {
    tabData.value = res.data
    // 首次进来需要拿楼层第一条数据的id来获取当前数据
    if (floorId.value === '') {
      floorId.value = tabData.value[0].id
    }
    getList()
  }
}
// 根据不同的楼层id楼层信息
const getList = async () => {
  dataLoading.value = true
  try {
    const res: any = await getAllByFloorOldPeople(floorId.value)
    if (res.code === 200) {
      roomVoList.value = res.data
    }
  } finally {
    dataLoading.value = false
  }
}
// 获取楼层id
const getFloorId = (id, i) => {
  floorIndex.value = i
  floorId.value = id

  getAllFloorList()
  userStore.setFloorInfo({})
}
// 查看房间
const handleRoomCheck = () => {
  // handleRoomData(id)
  checkVisible.value = true
}
// 关闭查看房间
const handleCheckRoomClose = () => {
  checkVisible.value = false
  selectOlder.value = []
  singleNurse.value = []
}
</script>
<style lang="less" src="../../../liveIn/index.less"></style>
