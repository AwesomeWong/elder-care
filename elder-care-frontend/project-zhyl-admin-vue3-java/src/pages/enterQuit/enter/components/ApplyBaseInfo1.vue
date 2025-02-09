<!-- 补全申请资料 -->
<template>
  <div class="detail-base-info1">
    <SwitchBar
      ref="tabBar"
      :data="checkIntabData"
      @change-id="getActiveId"
    ></SwitchBar>
    <!-- 基本信息 -->
    <div v-if="active === 0">
      <div class="info-block">
        <div class="info-item">
          <h1>老人姓名：</h1>
          <span> {{ checkInfo.name }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">老人身份证号：</h1>
          <span> {{ checkInfo.idCardNo }}</span>
        </div>
        <div class="info-item">
          <h1>性别：</h1>
          <span> {{ checkInfo.sex === 0 ? '男' : '女' }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">出生日期：</h1>
          <span> {{ checkInfo.birthdate }}</span>
        </div>
        <div class="info-item">
          <h1>年龄：</h1>
          <span> {{ checkInfo.age }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">联系方式：</h1>
          <span> {{ checkInfo.phone }}</span>
        </div>
        <div class="info-item lastText">
          <h1>家庭住址：</h1>
          <span> {{ checkInfo.address }}</span>
        </div>
        <div class="info-item">
          <h1>民族：</h1>
          <span>
            {{
              checkInfo.nationality !== undefined ? checkInfo.nationality : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt">政治面貌：</h1>
          <span>
            {{
              checkInfo.politicStatus !== undefined
                ? checkInfo.politicStatus
                : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>宗教信仰：</h1>
          <span>
            {{
              checkInfo.religion !== undefined ? checkInfo.religion : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt">婚姻状况：</h1>
          <span>
            {{
              checkInfo.maritalStatus !== undefined
                ? checkInfo.maritalStatus
                : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>文化程度：</h1>
          <span>
            {{
              checkInfo.education !== undefined ? checkInfo.education : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt">经济来源：</h1>
          <span>
            {{
              checkInfo.sourceFinance !== undefined
                ? checkInfo.sourceFinance
                : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>特长爱好：</h1>
          <span>
            {{ checkInfo.hobby !== undefined ? checkInfo.hobby : '--' }}</span
          >
        </div>
        <div class="info-item">
          <h1 class="label-wt">医疗保障：</h1>
          <span>
            {{
              checkInfo.medicalSecurity !== undefined
                ? checkInfo.medicalSecurity
                : '--'
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>医保卡号：</h1>
          <span>
            {{
              checkInfo.medicineCard !== undefined
                ? checkInfo.medicineCard
                : '--'
            }}</span
          >
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 家属信息 -->
    <div v-if="active === 1">
      <t-table
        ref="tableRef"
        row-key="key"
        :columns="FROMCOLUMNS"
        :data="baseData.retreat.memberElderDtos"
        table-layout="auto"
      >
      </t-table>
    </div>
    <!-- end -->
    <!-- 资料上传信息 -->
    <div v-if="active === 2">
      <div class="info-block">
        <div class="info-item lastText">
          <h1 class="label-wt">一寸照片：</h1>
          <span class="img">
            <t-image-viewer :images="[baseData.checkIn.url1]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="baseData.checkIn.url1"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /></span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </span>
        </div>
        <div class="info-item lastText">
          <h1 class="label-wt">身份证人像面：</h1>
          <span class="img"
            ><t-image-viewer :images="[baseData.checkIn.url2]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="baseData.checkIn.url2"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /></span>
                  </div>
                </div>
              </template> </t-image-viewer
          ></span>
        </div>
        <div class="info-item lastText">
          <h1 class="label-wt">身份证国徽面：</h1>
          <span class="img"
            ><t-image-viewer :images="[baseData.checkIn.url3]">
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="baseData.checkIn.url3"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /></span>
                  </div>
                </div>
              </template> </t-image-viewer
          ></span>
        </div>
      </div>
    </div>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ZoomInIcon } from 'tdesign-icons-vue-next'
import { checkIntabData } from '@/utils/commonData'
// 组件
import SwitchBar from '@/components/switchBar/switchBartop.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  checkInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const active = ref(0) // 当前tab选中的值
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '家属姓名',
      colKey: 'name',
      minWidth: 200
    },
    {
      title: '家属联系方式',
      colKey: 'phone',
      minWidth: 200
    },
    {
      title: '与老人关系',
      colKey: 'refName',
      minWidth: 200
    }
  ]
})
// ------定义方法------
// 获取tab当前值
const getActiveId = (val, index) => {
  active.value = index
}
</script>
