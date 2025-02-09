<!-- 取消记录 -->
<template>
  <!-- 取消记录 -->
  <t-card title="取消记录">
    <div class="info-block">
      <div class="info-item">
        <h1>取消人：</h1>
        <span
          >{{ data.updater ? data.updater : data.memberVo.name
          }}<span
            class="bt-small"
            :class="data.createType === 1 ? 'warBtn' : ''"
            >{{ data.createType === 1 ? '前台客户' : '后台用户' }}</span
          ></span
        >
      </div>
      <div class="info-item">
        <h1>取消原因：</h1>
        <span>{{ data.reason }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 获取父组件值、方法
const props = defineProps({
  // 所有的老人数据
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// ------定义变量------
const memberVoData = ref({}) // 取消信息
// 触发父级事件
onMounted(() => {
  memberVoData.value = props.data.memberVo
})
</script>
