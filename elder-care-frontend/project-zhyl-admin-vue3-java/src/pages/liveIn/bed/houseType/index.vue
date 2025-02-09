<!-- 床位列表页 -->
<template>
  <div class="min-h bg-wt pd-main br-2">
    <!-- 楼层tab导航 -->
    <SwitchBar
      ref="tabBar"
      :data="tabData"
      :route-type="routeType"
      :bed-select-data="bedSelectData"
      :floorIndex="floorIndex"
      @handle-floor-edit="handleFloorEdit"
      @handle-add="handleFloorAdd"
      @change-id="getFloorId"
    ></SwitchBar>
    <!-- end -->
    <!-- 房型列表 -->
    <div :style="routeType === 'config' ? 'padding-bottom: 86px' : ''">
      <HouseList
        :room-voList="roomVoList"
        :floor-data="tabData"
        :route-type="routeType"
        :bed-select-data="bedSelectData"
        @handle-edit="handleRoomEdit"
        @handle-delete="handleDelete"
        @handle-room-add="handleRoomAdd"
        @handle-add="handleBedAdd"
        @handle-bed-edit="handleBedEdit"
        @handle-check="handleRoomCheck"
        @getBedInfo="getBedInfo"
      ></HouseList>
    </div>
    <!-- end -->
    <div
      v-if="routeType === 'config' && tabData.length > 0"
      class="boxBottom fx fx-ct bg-wt"
    >
      <button theme="primary" class="bt bt-grey wt-60" @click="handleBack">
        返回
      </button>
      <button
        theme="primary"
        class="bt wt-60"
        :class="!tabCheck ? '' : 'bt-forbid'"
        @click="handleSave"
      >
        保存
      </button>
    </div>
    <!-- 楼层添加、编辑 -->
    <AddFloor
      ref="floor"
      :visible="floorVisible"
      :title="textVal"
      :min-num="minNum"
      :data="floorData"
      :room-voList="roomVoList"
      :is-room-delete="isRoomDelete"
      @handle-delete="handleFloorDelete"
      @handle-close="handleFloorClose"
      @handle-add="handleFloorAddSubmit"
      @handle-edit="handleFloorEditSubmit"
    ></AddFloor>
    <!-- end -->
    <!-- 房间添加、编辑 -->
    <AddRoom
      ref="room"
      :visible="roomVisible"
      :title="textVal"
      :min-num="minNum"
      :data="roomData"
      :room-type-data="roomTypeData"
      @handle-close="handleRoomClose"
      @handle-add="handleRoomAddSubmit"
      @handle-edit="handleRoomEditSubmit"
    ></AddRoom>
    <!-- end -->
    <!-- 查看房间 -->
    <CheckRoom
      :dialog-visible="checkVisible"
      :data="roomData"
      @handle-close="handleCheckRoomClose"
    ></CheckRoom>
    <!-- end -->
    <!-- 床位添加、编辑 -->
    <AddBed
      ref="bed"
      :visible="bedVisible"
      :title="textVal"
      :min-num="minNum"
      :data="bedData"
      @handle-close="handleBedClose"
      @handle-add="handleBedAddSubmit"
      @handle-edit="handleBedEditSubmit"
    ></AddBed>
    <!-- end -->
    <!-- 添加、编辑房间 -->
    <Delete
      :visible="deleteVisible"
      :delete-text="operateText"
      @handle-close="handleDeleteClose"
      @handle-delete="handleDeleteSubmit"
    ></Delete>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store'
// 接口
import {
  getAllList,
  getRoomBedList,
  floorAdd,
  floorUpdate,
  floorDelete,
  getFloorDetails,
  getRoomTypesList,
  roomAdd,
  roomUpdate,
  roomDelete,
  getRoomDetails,
  bedAdd,
  bedUpdate,
  getBedDetails,
  bedDelete
} from '@/api/liveIn'
// 组件
// tab切换
import SwitchBar from './components/SwitchBartop.vue'

// 房型列表
import HouseList from './components/List.vue'
// 楼层添加编辑弹层
import AddFloor from './components/AddFloor.vue'
// 房间添加编辑弹层
import AddRoom from './components/AddRoom.vue'
// 查看房间弹层
import CheckRoom from './components/CheckRoom.vue'
// 床位添加编辑弹层
import AddBed from './components/AddBed.vue'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// ------定义变量------
const userStore = useUserStore()
const router = useRouter() // 获取全局
const route = useRoute() // 获取局部
const textVal = ref('') // 弹层标题
// 楼层变量
const tabBar = ref(null) // 楼层的ref
const tabData = ref([]) // 定义tab切换数据
const roomVoList = ref([])
const floorData = ref<Object | any>({}) // 楼层基本信息
const floorId = ref('') // 楼层id
const floorVisible = ref(false) // 添加、编辑楼层弹层显示/隐藏
const minNum = ref(null) // 最小的排序号
const isOperateSuccess = ref(false) // 是否添加成功
const floorIndex = ref(null)
const isRoomDelete = ref(false) // 判断楼层下是否有房间，如果有删除按钮置灰
const deleteFloorId = ref('') // 要删除的楼层id
const floor = ref(null)
// 房间变量
const roomId = ref('') // 房间id
const roomVisible = ref(false) // 添加、编辑房间弹层显示/隐藏
const checkVisible = ref(false) // 查看房间弹层显示/隐藏
const roomData = ref({}) // 房间表单信息
const roomTypeData = ref([]) // 所有房间类型
const room = ref(null)
const dataLoading = ref(false) // 加载loading
// 床位变量
const bed = ref(null)
const bedId = ref('') // 房间id
const bedVisible = ref(false) // 添加、编辑房间弹层显示/隐藏
const bedData = ref({}) // 床位表单数据
const bedSelectData = ref({}) // 选择的床位信息
const tabCheck = ref(false) // 是否触发了tab切换
// 删除弹层
const deleteVisible = ref(false) // 删除弹层显示/隐藏
const operateText = ref('') // 删除信息
const delectType = ref(null) // 需要删除的类型，因为楼层、房间和床位用的是一个删除弹窗
const routeType = ref(null)
// 默认加载数据
onMounted(() => {
  if (route.query.type !== undefined) {
    routeType.value = route.query.type
  }
  getAllFloorList()
  getHouseType()
})
// ------定义方法------
// 获取楼层数据
const getAllFloorList = async () => {
  const res: any = await getAllList()
  if (res.code === 200) {
    tabData.value = res.data
    const floorBase = userStore.floorInfo as any
    // 判断是否添加楼层成功，如果成功需要拿当前数据的id来获取当前的楼层数据
    if (tabData.value.length > 0) {
      tabData.value.forEach((val, index) => {
        // 新增编辑楼层逻辑
        if (floorBase.code) {
          if (floorBase.code > val.code) {
            tabBar.value.currentId = index + 1
            floorId.value = tabData.value[index + 1].id
          } else if (
            (floorBase.code === val.code && floorBase.name === val.name) ||
            floorBase.id === val.id
          ) {
            tabBar.value.currentId = index
            floorId.value = tabData.value[index].id
          }
        } else {
          // 删除楼层逻辑
          if (index === floorIndex.value) {
            floorId.value = tabData.value[floorIndex.value].id
          }
          if (isOperateSuccess.value && floorId.value !== val.id) {
            tabBar.value.currentId = floorIndex.value
            // 如果删除的是最后一条，设置当前选中状态（要删除的当前状态值-1），同理当前的楼层数据设置为最后一条
            // floorIndex.value是要删除的楼层索引值，从子元素拿去
            if (tabData.value.length === floorIndex.value) {
              tabBar.value.currentId = floorIndex.value - 1 // 获取现有的tab选中状态
              floorId.value = tabData.value[floorIndex.value - 1].id
            }
            // 删除的是第一条逻辑
            if (index === floorIndex.value) {
              floorId.value = tabData.value[floorIndex.value].id
            }
            isOperateSuccess.value = false
          }
        }

        if (route.query.obj !== undefined) {
          bedSelectData.value = JSON.parse(decodeURIComponent(route.query.obj))
        }

        // 从入组配置页面首次进入，显示当前列表数据
        if (routeType.value === 'config' && !tabCheck.value) {
          if (bedSelectData.value && bedSelectData.value.floorId) {
            if (val.id === bedSelectData.value.floorId) {
              floorIndex.value = index
              floorId.value = val.id
            }
          }
        }
      })
    }
    // 首次进来需要拿楼层第一条数据的id来获取当前数据
    if (floorId.value === '') {
      floorId.value = tabData.value[0].id
    }
    getList()
  }
}
// 获取房间类型
const getHouseType = async () => {
  const res: any = await getRoomTypesList()
  if (res.code === 200) {
    roomTypeData.value = res.data.filter((val) => val.status === 1)
  }
}
// 根据不同的楼层id楼层信息
const getList = async () => {
  dataLoading.value = true
  try {
    const res: any = await getRoomBedList(floorId.value)
    if (res.code === 200) {
      roomVoList.value = res.data
    }
  } finally {
    dataLoading.value = false
  }
}
// 新增楼层提交
const handleFloorAddSubmit = async (val) => {
  const res: any = await floorAdd(val)
  if (res.code === 200) {
    getAllFloorList()
    handleFloorClose()
    floor.value.handleClear()
    MessagePlugin.success(`新增成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 获取楼层详情
const handleFloorData = async (id) => {
  const res: any = await getFloorDetails(id)
  if (res.code === 200) {
    floorData.value = res.data
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 编辑楼层提交
const handleFloorEditSubmit = async (val) => {
  const params = {
    id: floorData.value.id,
    code: val.code,
    name: val.name
  }
  const res: any = await floorUpdate(params)

  if (res.code === 200) {
    getAllFloorList()
    handleFloorClose()
    floor.value.handleClear()
    MessagePlugin.success(`编辑成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}

// 删除楼层
const handleFloorDeleteSubmit = async () => {
  isOperateSuccess.value = false
  const res: any = await floorDelete(deleteFloorId.value)
  if (res.code === 200) {
    userStore.setFloorInfo({})
    isOperateSuccess.value = true
    floor.value.handleClear()
    getAllFloorList() // 刷新列表
    floorVisible.value = false // 隐藏楼层弹层
    handleDeleteClose() // 关闭删除弹层
  }
}
// 新增房间提交
const handleRoomAddSubmit = async (val) => {
  const params = {
    ...val,
    floorId: floorId.value
  }
  const res: any = await roomAdd(params)
  if (res.code === 200) {
    getList() // 刷新列表
    handleRoomClose() // 隐藏房间弹层
    room.value.handleClear()
    MessagePlugin.success(`新增成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 获取房间详情
const handleRoomData = async (id) => {
  const res: any = await getRoomDetails(id)
  if (res.code === 200) {
    roomData.value = res.data
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 编辑房间提交
const handleRoomEditSubmit = async (val) => {
  const res: any = await roomUpdate(val)
  if (res.code === 200) {
    getList()
    handleRoomClose() // 隐藏房间弹层
    room.value.handleClear()
    MessagePlugin.success(`编辑成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 删除房间提交
const handleRoomDeleteSubmit = async () => {
  const res: any = await roomDelete(roomId.value)
  if (res.code === 200) {
    getList()
    handleDeleteClose()
  }
}
// 新增床位提交
const handleBedAddSubmit = async (val) => {
  const params = {
    ...val,
    roomId: roomId.value
  }
  const res: any = await bedAdd(params)
  if (res.code === 200) {
    getList()
    handleBedClose()
    bed.value.handleClear()
    MessagePlugin.success(`新增成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 编辑床位提交
const handleBedEditSubmit = async (val) => {
  const params = {
    ...val,
    roomId: roomId.value
  }
  const res: any = await bedUpdate(params)
  if (res.code === 200) {
    getList()
    handleBedClose()
    bed.value.handleClear()
    MessagePlugin.success(`编辑成功`)
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 获取床位详情
const handleBedData = async (id) => {
  const res: any = await getBedDetails(id)
  if (res.code === 200) {
    bedData.value = res.data
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 删除床位提交
const handleBedDeleteSubmit = async () => {
  const res: any = await bedDelete(bedId.value)
  if (res.code === 200) {
    getList()
    handleDeleteClose()
  }
}
// 删除提交
const handleDeleteSubmit = () => {
  const type = delectType.value
  if (type === 2) {
    handleRoomDeleteSubmit()
  } else if (type === 3) {
    handleBedDeleteSubmit()
  } else {
    handleFloorDeleteSubmit()
  }
}
// 楼层
// 编辑楼层、获取楼层id
const handleFloorEdit = (id, i) => {
  floorIndex.value = i
  floorId.value = id
  floorVisible.value = true

  handleFloorData(floorId.value)
  userStore.setFloorInfo({})
  textEdit()
}

// 新增楼层弹层
const handleFloorAdd = () => {
  floorData.value = {
    code: 1
  }
  textAdd()
  floorVisible.value = true
}
// 关闭楼层弹层
const handleFloorClose = () => {
  floorVisible.value = false
}
// 楼层点击删除时显示删除弹层
const handleFloorDelete = (id) => {
  floorId.value = ''
  deleteFloorId.value = id
  handleDelete()
}
// 获取楼层id
const getFloorId = (id, i, isCheckTab) => {
  floorIndex.value = i
  floorId.value = id

  if (bedSelectData.value && bedSelectData.value.floorId) {
    if (id === bedSelectData.value.floorId) {
      tabCheck.value = false // 是否触发了tab切换
    } else {
      tabCheck.value = isCheckTab // 是否触发了tab切换
    }
  }

  getAllFloorList()
  userStore.setFloorInfo({})
}
// 房间
// 新增房间
const handleRoomAdd = () => {
  textAdd()
  roomVisible.value = true
}
// 编辑房间
const handleRoomEdit = (id) => {
  textEdit()
  roomId.value = id
  handleRoomData(id) // 打开编辑，获取房间详情
  roomVisible.value = true
}
// 查看房间
const handleRoomCheck = (id) => {
  handleRoomData(id)
  checkVisible.value = true
}
// 关闭查看房间
const handleCheckRoomClose = () => {
  room.value.handleClear()
  checkVisible.value = false
}
// 关闭房间弹层
const handleRoomClose = () => {
  roomVisible.value = false
}
// 床位
// 床位新增
const handleBedAdd = (id) => {
  roomId.value = id
  textAdd()
  bedVisible.value = true
}
// 床位编辑
const handleBedEdit = (id) => {
  textEdit()
  bedId.value = id
  handleBedData(id) // 打开编辑，获取床位详情
  bedVisible.value = true
}
// 床位关闭
const handleBedClose = () => {
  bedVisible.value = false
}
// 新增文本
const textAdd = () => {
  textVal.value = '新增'
}
// 新增文本
const textEdit = () => {
  textVal.value = '编辑'
}
// 显示删除弹层
const handleDelete = (type?, val?) => {
  // 用type来判断删除的是房间还是床位，因为他们公用了一个删除 弹层
  delectType.value = type
  if (type === 2) {
    roomId.value = val.id
    operateText.value = '房间'
  } else if (type === 3) {
    bedId.value = val.id
    operateText.value = '床位'
  } else {
    operateText.value = '楼层'
  }
  deleteVisible.value = true
}
// 关闭删除弹层
const handleDeleteClose = () => {
  deleteVisible.value = false
}
// 获取床位信息
const getBedInfo = (val) => {
  bedSelectData.value = {
    ...bedSelectData.value,
    bedId: val.id,
    bedNumber: val.bedNumber,
    roomId: val.roomId,
    code: val.code,
    floorId: val.floorId,
    floorName: val.floorName,
    bedCost: val.price,
    floorIndex: floorIndex.value
  }
  if (val.id) {
    tabCheck.value = false
  }
}
// 返回到入住列表
const handleBack = () => {
  if (route.query.obj !== undefined) {
    // 如果已经选中床位了，点击的是返回，不向床位配置传参
    bedSelectData.value = JSON.parse(decodeURIComponent(route.query.obj))
    if (bedSelectData.value.bedId !== undefined) {
      router.push({
        path: `/active/checkDetails`,
        query: {
          code: route.query.code,
          assigneeId: route.query.assigneeId,
          taskId: route.query.taskId,
          obj: encodeURIComponent(JSON.stringify(bedSelectData.value))
        }
      })
    } else {
      router.push({
        path: `/active/checkDetails`,
        query: {
          code: route.query.code,
          assigneeId: route.query.assigneeId,
          taskId: route.query.taskId
        }
      })
    }
  }
}
// 保存信息
const handleSave = () => {
  if (!tabCheck.value) {
    router.push({
      path: `/active/checkDetails`,
      query: {
        code: route.query.code,
        assigneeId: route.query.assigneeId,
        taskId: route.query.taskId,
        obj: encodeURIComponent(JSON.stringify(bedSelectData.value)) // 把从入住配置的传的已经填写的数据重新返回去
      }
    })
  }
}
</script>
<style lang="less" src="./../../index.less"></style>
