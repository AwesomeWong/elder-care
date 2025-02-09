<!--卡片列表页(带排序)-->
<template>
  <div class="cradList">
    <div class="itemCon">
      <div class="headTitle">
        <span>序号</span>
        <span>教师名称</span>
        <span>教师介绍</span>
        <span>排序</span>
        <span>用户端是否显示</span>
        <span>操作</span>
      </div>
      <div v-if="cardBaseData && cardBaseData.length" class="item">
        <ul>
          <li v-for="(val, i) in cardBaseData" :key="i">
            <div class="con">
              <!-- 序号 -->
              <div>
                <span v-if="i + 1 > 9">{{ i + 1 }}</span
                ><span v-else>{{ '0' + (i + 1) }}</span>
              </div>
              <div>
                <div class="head">
                  <t-image-viewer
                    :visible="visible[i]"
                    :images="[val.photo]"
                    :default-index="i"
                    @close="onClose(i)"
                  >
                    <template #trigger>
                      <div
                        class="tdesign-demo-image-viewer__ui-image tdesign-demo-image-viewer__base"
                      >
                        <img
                          :src="val.photo"
                          class="tdesign-demo-image-viewer__ui-image--img"
                          @error="onError(i)"
                        />
                        <div
                          class="tdesign-demo-image-viewer__ui-image--hover"
                          @click="onOpen(i)"
                        >
                          <span><icon name="zoom-in" size="24px" /></span>
                        </div>
                      </div>
                    </template>
                  </t-image-viewer>
                  {{ val.name }}
                </div>
              </div>
              <div>
                <div class="ellipsisHidden2">
                  <t-tooltip
                    v-if="val.introduce && val.introduce.length > 50"
                    :content="val.introduce"
                    placement="bottom"
                  >
                    {{ val.introduce }}
                  </t-tooltip>
                  <p v-else>
                    {{ val.introduce }}
                  </p>
                </div>
              </div>
              <div class="sortIcon">
                <span
                  :class="i === 0 ? 'upforbid' : 'up'"
                  @click="handleUp(val, i, 'up')"
                ></span>
                <span
                  :class="i === cardBaseData.length - 1 ? 'downforbid' : 'down'"
                  @click="handleDown(cardBaseData.length, i, val)"
                ></span>
              </div>
              <div>
                <span
                  ><span
                    class="iconTip"
                    :class="!val.isShow ? 'forbidIcon' : 'normalIcon'"
                  ></span
                  >{{ val.isShow === true ? '显示' : '隐藏' }}</span
                >
              </div>
              <div>
                <span class="font-bt" @click="handleIsShow(val)">{{
                  val.isShow === true ? '隐藏' : '显示'
                }}</span>
                <span class="btn-dl" @click="handleDeleteOpen(val)">删除</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 删除弹层 -->
    <Delete
      :dialog-delete-visible="dialogDeleteVisible"
      :delete-text="deleteText"
      @handleDelete="handleDelete"
      @handleClose="handleClose"
    ></Delete>
    <!-- end -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next'
// 组件

// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
// 获取父组件值、方法
const props = defineProps({
  // 获取数据
  cardBaseData: {
    type: Array<Object | any>,
    default: () => []
  }
})
// ------定义变量------
// 触发父组件的方法
const emit: Function = defineEmits(['getCardSort'])
const visible = reactive([false])
const isError = reactive([false])
const dialogDeleteVisible = ref(false) // 控制删除弹层
const deleteText = ref('此操作将永久删除这条信息，是否继续？') // 删除提示
// ------生命周期------
// ------定义方法------
// 用户端是否显示隐藏
const handleIsShow = (val) => {
  if (val.isShow) {
    val.isShow = false
  } else {
    val.isShow = true
  }
}
// 排序向上
const handleUp = (val, index, str) => {
  const selectData = props.cardBaseData
  if (index === 0) {
    return false
  }
  if (index != 0) {
    selectData[index] = selectData.splice(index - 1, 1, selectData[index])[0]
  } else {
    selectData.push(selectData.shift())
  }
}
// 排序向下
const handleDown = (length, index, val) => {
  const selectData = props.cardBaseData
  if (index === length - 1) {
    return false
  }
  if (index !== length - 1) {
    selectData[index] = selectData.splice(index + 1, 1, selectData[index])[0]
  } else {
    selectData.unshift(selectData.splice(index, 1)[0])
  }
}
// 删除
const handleDelete = async () => {
  MessagePlugin.success('删除成功!')
  emit('getCardSort')
  handleClose()
}
// 打开删除弹层
const handleDeleteOpen = (item) => {
  dialogDeleteVisible.value = true
}
// 关闭删除弹层
const handleClose = () => {
  dialogDeleteVisible.value = false
}
// 打开放大图弹层
const onOpen = (index: number) => {
  visible[index] = true
}
// 关闭放大图弹层
const onClose = (index: number) => {
  visible[index] = false
}
const onError = (index: number) => {
  isError[index] = true
}
</script>
