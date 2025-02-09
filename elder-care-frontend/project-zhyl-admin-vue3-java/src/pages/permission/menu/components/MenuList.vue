<!-- 左侧菜单树形列表 -->
<template>
  <div class="menuList">
    <div class="btn-box">
      <button class="bt newBoxbutton" @click="handleClickAddOrEdit()">
        菜单配置
      </button>
    </div>

    <div class="roleTable fx-fd-col">
      <div class="tabHead fx" :class="{ 'bd-non': activeIndex == '0' }">
        <div class="fx-1 toggle"></div>
        <div class="fx-1">菜单名称</div>
        <div class="fx-1">排序</div>
        <div class="fx-1">菜单状态</div>
        <div class="fx-1">操作</div>
      </div>
      <div class="tabList pt-rt fx-1">
        <MenuItem
          v-for="(item, index) in listData.length && listData[0].children"
          :key="item.id"
          :data="item"
          :index="index"
          :clickIndex="clickIndex"
          :isGrandSon="false"
          :defalutOpenKey="defalutOpenKey"
          :activeIndex="pageActiveIndex"
          @editHandle="editHandle"
          @delHandle="delHandle"
          @disableHandle="disableHandle"
          @activeHandle="activeHandle"
          @handleClickExpand="handleClickExpand"
        ></MenuItem>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import MenuItem from './MenuItem.vue'

const clickIndex = ref(0) as any
const pageActiveIndex = ref('') // 角色点击项
const listData = ref([]) as any
const defalutOpenKey = ref('')
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  activeIndex: {
    type: String
  }
})
const emit = defineEmits([
  'delHandle',
  'addHandle',
  'editHandle',
  'disableHandle',
  'activeHandle'
])
watch(
  () => props.activeIndex,
  (val) => {
    console.log(val, pageActiveIndex.value, '++++++++++++++')
    // pageActiveIndex.value = val
  }
)
onMounted(() => {
  // setTimeout(() => {
  //   pageActiveIndex.value =
  //     listData.value.length && listData.value[0].children[0].id
  // }, 200)
})
watchEffect(() => {
  listData.value = props.data
  pageActiveIndex.value =
    listData.value.length && listData.value[0].children[0].id
})

const editHandle = (params) => {
  // console.log(params, 'sssss')
  emit('editHandle', params)
}
const delHandle = (params) => {
  emit('delHandle', params)
}

const disableHandle = (params) => {
  emit('disableHandle', params)
}

const handleClickAddOrEdit = () => {
  emit('addHandle')
}

const handleClickExpand = (val, index) => {
  // console.log(val, index, 'val, index')
  defalutOpenKey.value = val.id
  clickIndex.value = index || 0
}
const activeHandle = (rowId, childLength, isChild, id) => {
  // console.log(
  //   rowId,
  //   childLength,
  //   isChild,
  //   id,
  //   'rowId, childLength, isChild, id'
  // )
  emit('activeHandle', rowId)
  pageActiveIndex.value = id
}
</script>

<style lang="less" scoped>
.menuList {
  background-color: #f2f2f2;
  min-width: 600px;
  padding: 20px;
  .btn-box {
    display: flex;
    justify-content: end;
    .newBoxbutton {
      width: 88px;
    }
  }

  .roleTable {
    min-height: 82vh;
    text-align: center;
    padding: 20px 0;
    line-height: 50px;
    .tabHead {
      font-weight: 500;
      color: #262626;
      border-bottom: solid 1px var(--color-border);
      .fx-1:last-child {
        text-align: left;
        position: relative;
        right: 25px;
      }
      .fx-1:nth-child(4) {
        position: relative;
        right: 13px;
      }
    }
    .tabList {
      .fx {
        border-bottom: solid 1px var(--color-border);
      }
      .font-del,
      .btn-split-right {
        margin-right: 7.5px;
        padding-right: 7.5px;
      }
    }
    .searchBox {
      width: 200px;
    }
    .activeRow {
      position: absolute;
      background-color: #fff;
      border-radius: 8px 0 0 8px;
      width: calc(100% + 20px);
      height: 50px;
      right: -20;
      .topTag,
      .botTag {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #fff;
        top: -8px;
        right: 0;
        &::after {
          position: relative;
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 0 0 8px 0;
          background-color: #f2f2f2;
        }
      }
      .botTag {
        top: auto;
        bottom: -8px;
        &::after {
          border-radius: 0 8px 0 0;
        }
      }
    }
  }
  .toggle {
    width: 20px;
    flex: none;
  }
}
</style>
