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
            <div class="device">
              <t-tooltip
                v-for="(item, index) in roomItem.deviceVos"
                :key="index"
                placement="bottom"
                show-arrow
              >
                <template #content>
                  <div class="product">{{ item.productName }}</div>
                  <div class="deviceName">{{ item.deviceName }}</div>
                </template>
                <img :src="getImgSrc(item)" class="device-item" />
              </t-tooltip>
            </div>
          </div>
          <div v-if="getRoomWuData(roomItem).length" class="wuData">
            <div
              v-for="(item, index) in getRoomWuData(roomItem)"
              :key="index"
              class="wuDataItem"
            >
              <span class="label">{{ item.label }}</span>
              <span class="wuDataVal">{{ getWuKdyVal(item) }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <!--  -->
        <!-- 床位列表 -->
        <div class="bedList">
          <div
            v-if="
              roomItem.bedVoList &&
              roomItem.bedVoList.length &&
              !(
                roomItem.bedVoList.filter((item) => !item.deviceVos.length)
                  .length === roomItem.bedVoList.length
              )
            "
          >
            <ul>
              <li
                v-for="(item, index) in roomItem.bedVoList.filter(
                  (item) => item.deviceVos.length
                )"
                :key="index"
                class="leisure"
                :class="item.status === 2 ? 'unusual' : ''"
              >
                <!-- <div class="bedIcon"><span class="leisureIcon"></span></div> -->
                <div class="bedText">
                  <div class="deviceBox">
                    <div>床位号： &nbsp;&nbsp;&ensp;{{ item.bedNumber }}</div>

                    <div class="device">
                      <t-tooltip
                        v-for="(item1, index1) in item.deviceVos"
                        :key="index1"
                        placement="bottom"
                        show-arrow
                      >
                        <template #content>
                          <div class="product">{{ item1.productName }}</div>
                          <div class="deviceName">{{ item1.deviceName }}</div>
                        </template>
                        <template #triggerElement>
                          <img :src="getImgSrc(item1)" class="device-item" />
                        </template>
                      </t-tooltip>
                    </div>
                  </div>
                  <p class="oldName">
                    老人姓名：&nbsp;{{ item.name ? item.name : '--' }}
                  </p>
                  <div v-if="item.bedStatus === 1" class="olderStatus">
                    <div
                      v-if="
                        !(
                          item.deviceVos &&
                          item.deviceVos.length ===
                            item.deviceVos.filter(
                              (item1) =>
                                !item1.deviceDataVos ||
                                !item1.deviceDataVos.length
                            ).length
                        )
                      "
                    >
                      <div class="left">
                        <img :src="getSleepStatusImg(item)" />
                        <text class="bedStatus">{{
                          getSleepStatusText(item)
                        }}</text>
                      </div>
                      <div class="right">
                        <div class="top">
                          <img
                            :src="
                              getWuDataBySleepStatus(item)
                                ? getWuDataBySleepStatus(item).src
                                : ''
                            "
                          />
                          <div class="label">
                            {{
                              getWuDataBySleepStatus(item)
                                ? getWuDataBySleepStatus(item).label
                                : ''
                            }}
                          </div>
                          <div class="val">
                            {{
                              getWuDataBySleepStatus(item)
                                ? getWuDataBySleepStatus(item).dataValue
                                : ''
                            }}
                          </div>
                          <div class="unit">
                            {{
                              getWuDataBySleepStatus(item)
                                ? getWuDataBySleepStatus(item).unit
                                : ''
                            }}
                          </div>
                        </div>
                        <div class="bottom">
                          <img
                            :src="
                              getWuDataBySleepStatus1(item)
                                ? getWuDataBySleepStatus1(item).src
                                : ''
                            "
                          />
                          <div class="label">
                            {{
                              getWuDataBySleepStatus1(item)
                                ? getWuDataBySleepStatus1(item).label
                                : ''
                            }}
                          </div>
                          <div class="val">
                            {{
                              getWuDataBySleepStatus1(item)
                                ? getWuDataBySleepStatus1(item).dataValue
                                : ''
                            }}
                          </div>
                          <div class="unit">
                            {{
                              getWuDataBySleepStatus1(item)
                                ? getWuDataBySleepStatus1(item).unit
                                : ''
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="noPeople">当前床位设备无数据</div>
                  </div>

                  <div v-else class="noPeople">当前床位没有安排老人</div>
                </div>

                <!-- <div class="setting"></div> -->
              </li>
            </ul>
          </div>
          <!-- <div v-else-if="bedNodeviceAll(roomItem.bedVoList)" class="noData">
            当前房间床位都没有绑定设备
          </div> -->
          <div v-else class="noData">
            当前房间没有安排床位或床位没有绑定设备
          </div>
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
import {
  sleepStatus,
  productIconList,
  wuDataList,
  roomStatus,
  baoJingStatus
} from '../constants'
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
  }
})
// 获取当前房间对应的物模型数据
const getRoomWuData = (item) => {
  const wuList = []
  if (item && item.deviceVos.length) {
    item.deviceVos.forEach((item1) => {
      if (item1.deviceDataVos) {
        wuList.push(...item1.deviceDataVos)
      } else {
        return []
      }
    })
  }
  return getSameRoomData(wuDataList, wuList)
}
// 根据物模型的key返回对应的文字状态值
const getWuKdyVal = (item) => {
  if (item.functionName === 'zidongmengongzuozhuangtai') {
    return roomStatus[Number(item.dataValue)]
  }
  if (item.functionName === 'SmokeSensorState') {
    return baoJingStatus[Number(item.dataValue)]
  }
  return item.dataValue
}
// 求自定义物模型和设置的物模型的交集
const getSameRoomData = (array1, array2) => {
  // 创建一个空数组来存储交集结果
  const intersection = []
  // 遍历第一个数组
  for (const item1 of array1) {
    // 在第二个数组中查找匹配的对象
    const matchingItem = array2.find(
      (item2) => item2.functionName === item1.value
    )

    if (matchingItem) {
      // 如果找到匹配的对象，将其复制到结果数组，并添加新属性
      const newItem = {
        ...item1,
        ...matchingItem,
        dataValue: matchingItem.dataValue
      }
      intersection.push(newItem)
    }
  }
  // console.log(intersection, 'intersection')
  return intersection
}
// 根据睡眠状态获取对应的心率或者离床次数物模型
const getWuDataBySleepStatus = (item) => {
  const obj = getRoomWuData(item).filter(
    (item) => item.functionName === 'shuimianzhuangtai'
  )
  if (obj.length) {
    const arr = getRoomWuData(item).filter(
      (item) =>
        item.functionName ===
        (obj[0].dataValue === '2' ? 'lichuangcishu' : 'HeartRate')
    )
    return arr[0]
  }
}
// 根据睡眠状态获取对应的呼吸率或者离床时间物模型
const getWuDataBySleepStatus1 = (item) => {
  const obj = getRoomWuData(item).filter(
    (item) => item.functionName === 'shuimianzhuangtai'
  )

  if (obj.length) {
    const arr = getRoomWuData(item).filter(
      (item) =>
        item.functionName ===
        (obj[0].dataValue === '2' ? 'lichuagnshijian' : 'RespiratoryRate')
    )
    return obj[0].dataValue === '2'
      ? { ...arr[0], dataValue: timestampToTime(arr[0].dataValue) }
      : arr[0]
  }
}
// 获取睡眠状态对应的图片
const getSleepStatusImg = (item) => {
  const obj = getRoomWuData(item).filter(
    (item) => item.functionName === 'shuimianzhuangtai'
  )
  if (obj[0]) {
    return sleepStatus[Number(obj[0].dataValue)].src
  }
}
// 获取睡眠状态对应的文案
const getSleepStatusText = (item) => {
  const obj = getRoomWuData(item).filter(
    (item) => item.functionName === 'shuimianzhuangtai'
  )
  if (obj[0]) {
    return sleepStatus[Number(obj[0].dataValue)].value
  }
}
// 获取产品对应的图片
const getImgSrc = (item) => {
  // console.log(item, 'itemitemitem')
  const obj = productIconList.filter((item1) => item1.value === item.productKey)
  if (obj.length) {
    return obj[0].src
  }
  return 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/1b2cccd6-895f-4118-83d4-8e44fb47a1fd.png'
}
// 时间戳转成时分秒
const timestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000) // 将时间戳转换为毫秒
  const hours = date.getUTCHours().toString().padStart(2, '0') // 获取小时并格式化为两位数
  const minutes = date.getUTCMinutes().toString().padStart(2, '0') // 获取分钟并格式化为两位数
  const seconds = date.getUTCSeconds().toString().padStart(2, '0') // 获取秒钟并格式化为两位数
  return `${hours}:${minutes}:${seconds}`
}
</script>
<style lang="less">
.t-tooltip--default .t-popup__content {
  width: auto !important;
  .product,
  .deviceName {
    font-size: 12px !important;
  }
  .product {
    color: #191919;
    margin-bottom: 4px;
  }
  .deviceName {
    color: #999;
  }
}
</style>
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
        width: calc(33.3% - 12px);
        min-height: 178px;
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
          width: 100%;
          .oldName {
            margin-bottom: 24px;
          }
          .olderStatus > div {
            display: flex;
          }
          .noPeople {
            text-align: center;
            color: var(--color-bk6);
            display: block;
            margin-top: 35px;
          }
          .olderStatus {
            .noPeople {
              text-align: center;
              color: var(--color-bk6);
              display: block;
              margin-top: 35px;
            }
            .left {
              margin-right: 22px;
              display: flex;
              flex-direction: column;
              img {
                width: 44px;
                height: 44px;
              }
              .bedStatus {
                font-size: 14px;
                color: #595959;
                position: relative;
                left: 3px;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
              bottom: 7px;
              .top,
              .bottom {
                display: flex;
                align-items: center;
                img {
                  width: 40px;
                  height: 40px;
                  margin-right: 5px;
                }
                .label {
                  min-width: 56px;
                  white-space: nowrap;
                }
                .label,
                .unit {
                  font-size: 14px;
                  color: #595959;
                }
                .val {
                  font-size: 24px;
                  color: #262626;
                  font-weight: bold;
                  margin-right: 6px;
                }
              }
            }
          }
          .deviceBox {
            display: flex;
            justify-content: space-between;
            .device {
              display: flex;
              align-items: center;
              margin-left: 15px;
              .device-item {
                width: 16px;
                height: 16px;
              }
            }
          }

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
      .wuData {
        display: flex;
        .wuDataItem {
          margin-right: 20px;
        }
      }
      .device {
        display: flex;
        align-items: center;
        margin-left: 15px;
        .device-item {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
