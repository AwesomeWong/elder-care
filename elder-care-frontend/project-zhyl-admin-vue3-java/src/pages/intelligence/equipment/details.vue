<!-- 详情 -->
<template>
  <div class="detail-base intelligenc">
    <!-- 设备信息 -->
    <div ref="mainHeight" class="bg-wt">
      <t-card title="设备信息">
        <div class="info-block">
          <div class="info-item">
            <h1 class="label-wt">设备名称：</h1>
            <span>{{ baseData.deviceName }}</span>
          </div>
          <div class="info-item">
            <h1 class="label-wt">所属产品：</h1>
            <span>{{ baseData.productName }} </span>
          </div>
          <div class="info-item">
            <h1 class="label-wt">DeviceSecret：</h1>
            <span>{{ baseData.deviceSecret }} </span>
          </div>
          <div class="info-item">
            <h1 class="label-wt">ProductKey：</h1>
            <span>{{ baseData.productKey }}</span>
          </div>
          <div class="info-item">
            <h1 class="label-wt">设备状态：</h1>
            <span
              ><span v-if="baseData.status === 'ONLINE'" class="bt-small"
                >在线</span
              >
              <span v-else-if="baseData.status === 'OFFLINE'" class="bt-small"
                >离线</span
              >
              <span v-else-if="baseData.status === 'UNACTIVE'" class="bt-small"
                >未激活</span
              >
              <span v-else class="bt-small">已禁用</span></span
            >
          </div>
          <div class="info-item">
            <h1 class="label-wt">接入位置：</h1>
            <span>
              <span v-if="locationData.length === 1">{{
                locationData[0]
              }}</span>
              <span v-if="locationData.length === 2"
                >{{ locationData[0] }}-{{ locationData[1] }}</span
              >
              <span v-if="locationData.length === 3"
                >{{ locationData[0] }}-{{ locationData[1] }}-{{
                  locationData[2]
                }}</span
              >
            </span>
          </div>
        </div>
      </t-card>
    </div>
    <!-- end -->
    <div ref="mainHeight" class="bg-wt min-steph height mt-24">
      <SwitchBar
        ref="tabBar"
        :data="facilityTabData"
        @change-id="changeId"
      ></SwitchBar>
      <!-- 设备详情 -->
      <div v-if="activeIndex === 0">
        <t-card title="设备信息">
          <div class="info-block">
            <div class="info-item">
              <h1 class="label-wt">设备名称：</h1>
              <span>{{ baseData.deviceName }}</span>
            </div>
            <div class="info-item">
              <h1>备注名称：</h1>
              <span>{{ baseData.nickname }}</span>
            </div>
            <div class="info-item">
              <h1 class="label-wt">地域：</h1>
              <span>{{ baseData.region }}</span>
            </div>
            <div class="info-item">
              <h1>节点类型：</h1>
              <span>{{ baseData.nodeType === 0 ? '直连设备' : '网关' }}</span>
            </div>
            <div class="info-item">
              <h1 class="label-wt">认证方式：</h1>
              <span>设备密钥</span>
            </div>
            <div class="info-item">
              <h1>IP地址：</h1>
              <span>{{ baseData.ipAddress ? baseData.ipAddress : '--' }}</span>
            </div>
            <div class="info-item">
              <h1 class="label-wt">固件版本：</h1>
              <span>{{
                baseData.firmwareVersion ? baseData.firmwareVersion : '--'
              }}</span>
            </div>
            <div class="info-item">
              <h1>创建人：</h1>
              <span>{{ baseData.creator ? baseData.creator : '--' }}</span>
            </div>
            <div class="info-item">
              <h1 class="label-wt">创建时间：</h1>
              <span>{{ baseData.gmtCreate }}</span>
            </div>
            <div class="info-item">
              <h1>激活时间：</h1>
              <span>{{ baseData.gmtActive ? baseData.gmtActive : '--' }}</span>
            </div>
          </div>
        </t-card>
      </div>
      <!-- end -->
      <!-- 物模型数据 -->
      <div v-if="activeIndex === 1">
        <div class="modelBox">
          <div class="modelL">
            <SwitchTabBar
              ref="tabBar"
              :data="modelTabData"
              @change-id="changeModelId"
            ></SwitchTabBar>
            <div class="modelList">
              <ul>
                <li
                  :class="isActive === 0 ? 'active' : ''"
                  @click="handleActive(0)"
                >
                  默认模块
                </li>
                <li
                  v-for="(item, index) in itemData"
                  :key="index"
                  :class="isActive === index + 1 ? 'active' : ''"
                  @click="handleActive(index + 1, item)"
                >
                  <p>{{ item.functionBlockName }}</p>
                  <p>标识符：{{ item.functionBlockId }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="modelR">
            <t-table
              v-if="activeModelIndex === 0"
              :data="publishedData"
              :columns="COLUMNSDETAILS"
              :row-key="rowKey"
              vertical-align="middle"
              :hover="true"
              :pagination="pagination.total > 10 ? pagination : null"
              :disable-data-page="total <= 10"
              :loading="dataLoading"
              table-layout="fixed"
              table-content-width="100%"
              @page-change="onPageChange"
            >
              <!-- 序号 -->
              <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
              <!-- end -->
              <!-- 设备状态 -->
              <template #information="{ row }">
                <span>设备信息</span>
              </template>
              <!-- end -->
              <!-- 数据值 -->
              <template #value="{ row }">
                <span v-if="row.name === '离床时间'">{{
                  getTimestamp(row.value)
                }}</span>
                <span v-else
                  >{{ row.value }}{{ row.value ? row.unit : '--' }}</span
                >
              </template>
              <!-- end -->
              <!-- 时间 -->
              <template #time="{ row }">
                <span>{{
                  row.time !== undefined ? getTimestamp(row.time) : '--'
                }}</span>
              </template>
              <!-- end -->
              <!-- 操作栏 -->
              <template #op="{ row }">
                <div class="operateCon">
                  <a class="font-bt" @click="handleOpen(row)">查看数据</a>
                </div>
              </template>
              <!-- end -->
              <!-- 暂无数据 -->
              <template #empty>
                <NoData></NoData>
              </template>
              <!-- end -->
            </t-table>
            <t-table
              v-if="activeModelIndex === 1"
              :data="eventListData"
              :columns="COLUMNSDETAILS2"
              :row-key="rowKey"
              vertical-align="middle"
              :hover="true"
              :pagination="pagination.total > 10 ? pagination : null"
              :disable-data-page="total <= 10"
              :loading="dataLoading"
              table-layout="fixed"
              table-content-width="100%"
              @page-change="onPageChange"
            >
              <!-- 序号 -->
              <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
              <!-- end -->
              <!-- 数据值 -->
              <template #value="{ row }">
                <span v-if="row.name === '离床时间'">{{
                  getTimestamp(row.value)
                }}</span>
                <span v-else
                  >{{ row.value }}{{ row.value ? row.unit : '--' }}</span
                >
              </template>
              <!-- end -->
              <!-- 时间 -->
              <template #time="{ row }">
                <span>{{
                  row.time !== undefined ? getTimestamp(row.time) : '--'
                }}</span>
              </template>
              <!-- end -->
              <!-- 操作栏 -->
              <template #type="{ row }">
                {{ row.type === 1 ? '信息' : '故障' }}
              </template>
              <!-- end -->
              <!-- 暂无数据 -->
              <template #empty>
                <NoData></NoData>
              </template>
              <!-- end -->
            </t-table>
          </div>
        </div>
      </div>
      <!-- end -->
    </div>
    <LookData
      :dialogVisible="dialogVisible"
      :dialog-data="listLookData"
      :pagination="paginationLook"
      :nextValid="nextValid"
      :preValid="preValid"
      :total="total"
      @handle-search="handleLookSearch"
      @handle-reset="handleLookReset"
      @handle-close-dialog="handleCloseDialog"
      @get-current="getCurrent"
    ></LookData>
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { facilityTabData, modelTabData } from '@/utils/commonData'
import { COLUMNSDETAILS, COLUMNSDETAILS2 } from './constants'
import { getTimestamp, getHours, getHours24, getDay7 } from '@/utils/date'

// 接口
import {
  getDetail,
  getPublishedList,
  getPropertyStatusList,
  getEventDataList,
  getDeviceDataList
} from '@/api/intelligence'
// 组件
import NoData from '@/components/noData/index.vue'
// tab切换
import SwitchBar from '@/components/switchBar/switchBartop.vue'
import SwitchTabBar from '@/components/switchBar/switchBar.vue'
// 查看数据
import LookData from './components/LookData.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const iotId = ref('') // 设备id
const productKey = ref('') // 产品key
const activeIndex = ref(0) // tabindex
const activeModelIndex = ref(0) //
const isActive = ref(0) // 默认数据索引值
const dialogVisible = ref(false) // 查看数据弹层
const listLookData = ref([]) // 查看数据
const eventListData = ref([])
const dataLoading = ref(false) // 加载中
const baseData = ref({}) // 基础信息
const publishedData = ref([]) // 运行状态 事件管理
const statusObj = ref({}) // 获取运行管理所需要的参数
const eventObj = ref({}) // 获取事件管理所需要的参数
const locationData = ref([]) // 获取接入的位置名称分老人和楼层
const nextValid = ref(null) // 是否还有下一页
const preValid = ref(null) // 是否还有上一页
const dateData = ref(null) // 时间戳
// 查看数据分页
const paginationLook = ref<Object | any>({
  pageSize: 5,
  pageNum: 1, // 默认当前页
  startTime: new Date(getHours('1')).getTime(),
  endTime: new Date().getTime()
})
// 行的key
const rowKey = 'index'
const itemData = ref([]) // 默认模块数据
//
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1 // 默认当前页
})
const total = ref(0) // 总条数
// 生命周期
onMounted(() => {
  if (route.query.iotId !== undefined) {
    iotId.value = route.query.iotId
    productKey.value = route.query.productKey
    getDetails()
  }
})
// ------定义方法------
// 获取详情数据
const getDetails = async () => {
  const params = {
    iotId: iotId.value,
    productKey: productKey.value
  }
  const res: any = await getDetail(params) // 获取列表数据
  if (res.code === 200) {
    baseData.value = res.data
    paginationLook.value.deviceId = baseData.value.deviceId
    paginationLook.value.deviceName = baseData.value.deviceName
    if (baseData.value.remark) {
      locationData.value = baseData.value.remark.split(',')
    }

    getPublished(baseData.value) // 获取详情的同时获取运行状态，需要把详情数据传给运行状态
  }
}
// 获取运行状态
const getPublished = async (val) => {
  const params = {
    productKey: productKey.value // 产品key
  }
  const res: any = await getPublishedList(params) // 获取列表数据
  if (res.code === 200) {
    const data = JSON.parse(res.data.thingModelJson)
    itemData.value = data.functionBlocks
    // 如果是选择的运行状态，去获取运行状态的接口
    if (activeModelIndex.value === 0) {
      getPropertyStatus(val, data.properties)
    } else {
      // 否则获取事件管理的接口
      getEventStatus(val, data.properties)
    }
  }
}
// 详情运行状态状态的卡片
const getPropertyStatus = async (basedata, val) => {
  statusObj.value = {
    ...statusObj.value,
    deviceName: basedata.deviceName,
    productKey: productKey.value
  }
  const res: any = await getPropertyStatusList(statusObj.value) // 获取列表数据
  if (res.code === 200) {
    const data = res.data.list.propertyStatusInfo
    const arr = []
    // 如果触发的是默认模块需要两个接口合并数据
    if (isActive.value === 0) {
      data.forEach((element) => {
        val.forEach((obj) => {
          if (element.identifier === obj.identifier) {
            const objVal = { ...element, ...obj }
            arr.push(objVal)
          }
        })
      })
      publishedData.value = arr
    } else {
      // 自定义的物模型无需合并数据，只需要一个接口就行
      publishedData.value = data
    }
  }
}
// 详情事件状态状态的卡片
const getEventStatus = async (basedata, val) => {
  eventObj.value = {
    ...eventObj.value,
    deviceName: basedata.deviceName,
    productKey: productKey.value,
    startTime: new Date(new Date().toLocaleDateString()).getTime(),
    endTime: new Date().getTime()
  }
  const res: any = await getEventDataList(eventObj.value) // 获取列表数据
  if (res.code === 200) {
    const data = res.data.list.propertyStatusInfo
    const arr = []
    // 如果触发的是默认模块需要两个接口合并数据
    if (isActive.value === 0) {
      if (data) {
        data.forEach((element) => {
          val.forEach((obj) => {
            if (element.identifier === obj.identifier) {
              const objVal = { ...element, ...obj }
              arr.push(objVal)
            }
          })
        })
      }

      eventListData.value = arr
    } else {
      // 自定义的物模型无需合并数据，只需要一个接口就行
      eventListData.value = data
    }
  }
}
// 获取运行状态列表的查看数据
const getLookList = async () => {
  const res: any = await getDeviceDataList(paginationLook.value)
  if (res.code === 200) {
    const data = res.data.records
    listLookData.value = data
    total.value = Number(res.data.total)
    paginationLook.value.total = Number(res.data.total)
  }
}
// tab切换
const changeId = (val) => {
  activeIndex.value = val
}
// 模型数据
const changeModelId = (val) => {
  activeModelIndex.value = val
  getPublished(baseData.value)
}
// 触发默认模块
const handleActive = (i, item) => {
  isActive.value = i
  // 如果选择的是自定义模块需要传functionBlockId
  if (i > 0 && item !== undefined) {
    statusObj.value.functionBlockId = item.functionBlockId
  } else {
    // 否则删除functionBlockId，显示默认模块的数据
    delete statusObj.value.functionBlockId
  }
  getPublished(baseData.value)
}
const onPageChange = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
}
// 打开查看数据弹层
const handleOpen = (row) => {
  paginationLook.value.functionId = row.identifier
  dialogVisible.value = true
  getLookList()
}
// 关闭查看数据弹层
const handleCloseDialog = () => {
  dialogVisible.value = false
  paginationLook.value.startTime = new Date(getHours('1')).getTime()
  paginationLook.value.endTime = new Date().getTime()
  getLookList()
}
// 查看数据时间范围筛选
const handleLookSearch = (val) => {
  preValid.value = true
  delete paginationLook.value.startTime
  delete paginationLook.value.endTime
  paginationLook.value.endTime = new Date().getTime() // 结束时间，现在的时间
  if (val === '1') {
    // 1小时
    paginationLook.value.startTime = new Date(getHours(val)).getTime()
    dateData.value = 60 * 60 * 1000
  } else if (val === '24') {
    // 24小时
    paginationLook.value.startTime = new Date(getHours24(val)).getTime()
    dateData.value = 24 * 60 * 60 * 1000
  } else if (val === '7') {
    // 7天
    paginationLook.value.startTime = new Date(getDay7(val)).getTime()
    dateData.value = 7 * 24 * 60 * 60 * 1000
  } else {
    dateData.value = null
    paginationLook.value.startTime = new Date(val[0]).getTime()
    paginationLook.value.endTime = new Date(val[1]).getTime()
  }
  getLookList()
}
// 重置，清空搜索框
const handleLookReset = () => {
  // 重置页码
  paginationLook.value = {
    pageSize: 5,
    pageNum: 1
  }
  getLookList()
}
// 翻页设置当前页
const getCurrent = (val) => {
  paginationLook.value.pageNum = val.current
  paginationLook.value.pageSize = val.pageSize
  getLookList()
}
// 返回
const handleReturn = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped src="./../index.less"></style>
