<!--房型列表-->
<template>
  <div v-if="floorData.length">
    <!-- end -->
    <!-- 房间列表 -->
    <div v-if="baseData.length" class="houseList">
      <div
        v-for="(roomItem, roomindex) in baseData"
        :key="roomindex"
        class="item"
      >
        <!-- 房间标题 -->
        <div class="title">
          <div class="lText">
            <span class="name">{{ roomItem.code }}</span>
          </div>
          <div class="batchSetting" @click="handleSetting(roomItem, 'batch')">
            批量设置护理员
          </div>
        </div>
        <!--  -->
        <!-- 床位列表 -->
        <div class="bedList">
          <div v-if="roomItem.bedVoList && roomItem.bedVoList.length">
            <ul>
              <li
                v-for="(item, index) in roomItem.bedVoList
                  .filter((item) => item.name)
                  .filter((item) => item.bedStatus === 1)"
                :key="index"
                class="leisure"
                :class="routeType !== 'config' ? '' : 'bedNoHover'"
              >
                <!-- <div class="bedIcon"><span class="leisureIcon"></span></div> -->
                <div class="bedText">
                  <p>床位号：{{ item.bedNumber }}</p>
                  <p>{{ item.name ? '老人姓名：' + item.name : '空闲' }}</p>
                  <p v-if="item.userVos && item.userVos.length" class="care">
                    护理员姓名：
                    <span
                      v-for="(val, index) in item.userVos?.map(
                        (item) => item.realName
                      )"
                      :key="index"
                      >{{ val }}</span
                    >
                  </p>
                  <p v-else class="care noCare">
                    护理人姓名：
                    <span>当前床位没有安排护理员</span>
                  </p>
                </div>
                <div
                  class="setting"
                  @click="handleSetting(item, 'single')"
                ></div>
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
import NoData from '@/components/noData/index.vue' // 无数据提示组件
// ------定义变量------

// 获取父组件值、方法
defineProps({
  //  基础列表数据
  baseData: {
    type: Array<Object | any>
  },
  // 楼层数据
  floorData: {
    type: Array<Object | any>
  },
  routeType: {
    type: String,
    default: null
  }
})
// 触发父级事件
const emit = defineEmits([
  'handleCheck',
  'handleSelectOlder',
  'handleSingleOlder'
])
// ------定义方法------
const handleSetting = (roomItem, type) => {
  console.log(roomItem, 'roomItem')
  emit('handleCheck')
  emit('handleSelectOlder', type === 'single' ? [roomItem] : roomItem.bedVoList)
  if (type === 'single') {
    emit(
      'handleSingleOlder',
      roomItem.userVos.map((item) => item.id)
    )
  }
}
</script>
<style lang="less" scoped>
.houseList {
  display: block;
  .item {
    display: block;
    width: auto;
    .bedList {
      .leisure {
        background-color: #f6fbfa;
        position: relative;
        .setting {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 12px;
          top: 12px;
          background-image: url('../../../../../assets/icon-sz@2x.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          cursor: pointer;
        }
        .bedText {
          p {
            margin-bottom: 4px;
          }
          .care {
            span {
              padding: 2.5px 9.5px;
              border-radius: 100px 100px 100px 100px;
              font-size: 12px;
              margin-right: 10px;
            }
            span:nth-child(1) {
              color: #008d71;
              background-color: #e5f4f2;
            }
            span:nth-child(2) {
              color: #395cff;
              background-color: #d8edfd;
            }
            span:nth-child(3) {
              color: #fb9b0d;
              background-color: #f4edd1;
            }
            span:nth-child(4) {
              color: #ff6800;
              background-color: rgba(#ffcfae, 0.37);
            }
          }
          .noCare {
            span {
              padding: 0 !important;
              background-color: transparent !important;
              color: #999 !important;
              font-size: 14px;
            }
          }
        }
      }
    }
    .title {
      .batchSetting {
        color: #008d71;
        cursor: pointer;
      }
    }
  }
}
</style>
