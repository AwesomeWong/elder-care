<!--房型列表-->
<template>
  <div v-if="floorData.length">
    <!-- 床位提示新增房间 -->
    <FloorInfo :routeType="routeType" @handle-add="handleRoomAdd"></FloorInfo>
    <!-- end -->
    <!-- 房间列表 -->
    <div v-if="roomVoList && roomVoList.length" class="houseList">
      <div
        v-for="(roomItem, roomindex) in roomVoList"
        :key="roomindex"
        class="item"
      >
        <!-- 房间标题 -->
        <div class="title">
          <div class="lText">
            <span class="name">{{ roomItem.code }}</span
            ><span class="num">{{ roomItem.typeName }}</span>
            <div v-if="routeType !== 'config'" class="icon">
              <span class="edit" @click="handleRoomEdit(roomItem.id)"></span
              ><span
                class="delect"
                :class="
                  roomItem.bedVoList && roomItem.bedVoList.length > 0
                    ? 'forbidDelect'
                    : ''
                "
                @click="handleDelete(2, roomItem)"
              ></span>
              <span class="check" @click="handleRoomCheck(roomItem.id)"></span>
            </div>
          </div>
          <span
            v-if="routeType !== 'config'"
            class="add"
            @click="handleBedAdd(roomItem.id)"
          ></span>
        </div>
        <!--  -->
        <!-- 床位列表 -->
        <div class="bedList">
          <div v-if="roomItem.bedVoList && roomItem.bedVoList.length">
            <ul>
              <li
                v-for="(item, index) in roomItem.bedVoList"
                :key="index"
                class="leisure"
              >
                <div class="bedIcon"><span class="leisureIcon"></span></div>
                <div class="bedText">
                  <p>床位号：{{ item.bedNumber }}</p>
                  <p
                    v-if="
                      (routeType === 'config' && item.bedStatus === 2) ||
                      (item.bedStatus === 1 && item.name)
                    "
                  >
                    {{ item.name ? item.name : '空闲' }}
                  </p>
                  <p v-else>空闲</p>
                </div>
                <div
                  class="bedHover"
                  :class="routeType !== 'config' ? '' : 'bedNoHover'"
                >
                  <span class="edit" @click="handleBedEdit(item.id)"></span>
                  <!-- 等老人功能好了后再加 -->
                  <!-- -->
                  <span
                    class="delect"
                    :class="item.bedStatus !== 0 ? 'forbidDelect' : ''"
                    @click="handleDelete(3, item)"
                  ></span>
                </div>
                <!-- 床位选择，申请入住配置需要选择床位 -->
                <t-radio
                  v-if="routeType === 'config'"
                  :checked="
                    isCheck === item.id && isRoom === roomItem.id ? true : false
                  "
                  :disabled="item.bedStatus !== 0"
                  class="radio"
                  @click="handleRadio(roomItem, item)"
                ></t-radio>
                <!-- end -->
              </li>
            </ul>
          </div>
          <div v-else class="noData">当前房间没有安排床位</div>
        </div>
        <!-- end -->
      </div>
    </div>
    <!-- end -->
    <div v-else><NoData></NoData></div>
  </div>
  <div v-else><NoData></NoData></div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
// 床位信息新增房间
import FloorInfo from './FloorInfo.vue'
import NoData from '@/components/noData/index.vue' // 无数据提示组件
// ------定义变量------

// 获取父组件值、方法
const props = defineProps({
  //  基础列表数据
  roomVoList: {
    type: Array<Object | any>
  },
  // 楼层数据
  floorData: {
    type: Array<Object | any>
  },
  routeType: {
    type: String,
    default: null
  },
  bedSelectData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 触发父级事件
const emit = defineEmits([
  'handleEdit',
  'handleDelete',
  'handleAdd',
  'handleBedEdit',
  'handleCheck',
  'handleRoomAdd',
  'getBedInfo'
])
const isCheck = ref('')
const isRoom = ref('')
// ------定义方法------
watch(
  () => props.roomVoList,
  (val) => {
    // 入住配置
    if (props.routeType === 'config') {
      // 获取从入住配置里拿到的回显数据
      const bedSelectData = props.bedSelectData
      console.log(bedSelectData)
      if (val.length > 0 && bedSelectData) {
        val.forEach((ele) => {
          if (
            ele.floorId === bedSelectData.floorId &&
            ele.id === bedSelectData.roomId
          ) {
            isRoom.value = ele.id
            if (ele.bedVoList.length > 0) {
              ele.bedVoList.forEach((obj) => {
                if (obj.id === bedSelectData.bedId) isCheck.value = obj.id
              })
            }
          }
        })
      }
    }
  }
)
// 删除
const handleDelete = (type, item) => {
  // 如果房间里有床位或者床位上有住人，禁止删除此信息
  if ((item.bedVoList && item.bedVoList.length === 0) || item.bedStatus === 0) {
    emit('handleDelete', type, item)
  }
}
// 新增房间
const handleRoomAdd = () => {
  emit('handleRoomAdd')
}
// 房间编辑
const handleRoomEdit = (id) => {
  emit('handleEdit', id)
}
// 房间查看
const handleRoomCheck = (id) => {
  emit('handleCheck', id)
}
// 床位添加
const handleBedAdd = (id) => {
  emit('handleAdd', id)
}
// 床位编辑
const handleBedEdit = (id) => {
  emit('handleBedEdit', id)
}
// 床位选择
const handleRadio = (room, item) => {
  isCheck.value = item.id
  isRoom.value = item.roomId
  const obj = {
    ...room,
    ...item,
    roomId: room.id,
    bedId: item.id
  }
  emit('getBedInfo', obj)
}
</script>
