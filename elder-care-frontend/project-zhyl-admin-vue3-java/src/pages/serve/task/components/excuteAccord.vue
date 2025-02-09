<!-- 护理信息 -->
<template>
  <!-- 执行记录s信息 -->
  <t-card title="执行记录">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-long">执行人：</h1>
        <span>{{ baseData.updater }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">执行时间：</h1>
        <span>{{ baseData.updateTime }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-long">执行图片：</h1>
        <span class="img">
          <t-image-viewer :images="[baseData.taskImage]">
            <template #trigger="{ open }">
              <div class="tdesign-demo-image-viewer__ui-image">
                <img
                  alt="test"
                  :src="baseData.taskImage"
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
      <div class="info-item">
        <h1 class="label-wt-long">执行记录：</h1>
        <span>{{ baseData.mark }}</span>
      </div>
    </div>
  </t-card>
</template>

<script setup lang="ts">
import { ZoomInIcon } from 'tdesign-icons-vue-next'

// 获取父组件值、方法
defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
// 触发父级事件
</script>
<style lang="less" scoped>
.info-block {
  display: block;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
