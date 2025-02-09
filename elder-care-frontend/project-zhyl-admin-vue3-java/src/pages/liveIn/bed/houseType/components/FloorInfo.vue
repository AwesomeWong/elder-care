<!--新增房间-->
<template>
  <div class="floorInfo">
    <ul>
      <li class="bedIcon"><span class="leisureIcon"></span>空闲中</li>
      <li class="bedIcon"><span class="checkInIcon"></span>已入住</li>
      <li class="bedIcon"><span class="goOutIcon"></span>请假中</li>
    </ul>
    <button v-if="routeType !== 'config'" class="bt wt-88" @click="handleAdd">
      新增房间
    </button>
  </div>
</template>
<script setup lang="ts">
// ------定义变量------
const emit = defineEmits(['handleAdd'])
// 获取父组件值、方法
const props = defineProps({
  routeType: {
    type: String,
    default: null
  }
})
// ------定义方法------
const handleAdd = () => {
  emit('handleAdd')
}
</script>
