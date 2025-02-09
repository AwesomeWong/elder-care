<!-- 执行记录 -->
<template>
  <!-- 执行记录 -->
  <t-card title="执行记录">
    <div class="info-block">
      <div class="info-item">
        <h1>执行人：</h1>
        <span>{{ data.nursingTaskVo.creator }}</span>
      </div>
      <div class="info-item wt-100">
        <h1>执行图片：</h1>
        <span>
          <t-upload
            ref="uploadRef"
            v-model="photoFile"
            action=""
            theme="image"
            :disabled="true"
          ></t-upload>
        </span>
      </div>
      <div class="info-item">
        <h1>执行记录：</h1>
        <span>{{ data.nursingTaskVo.mark }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
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
const cancelData = ref({}) // 取消信息
// 触发父级事件
const photoFile = ref([
  {
    url: ''
  }
]) // 绑定上传的文件
watch(props, (val) => {
  cancelData.value = val.data.bedVo
})
onMounted(() => {
  const data = props.data
  if (data) {
    photoFile.value[0].url = data.nursingTaskVo.taskImage
  }
})
</script>
