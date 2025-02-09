<!-- 权限管理 - 角色模块 -->
<template>
  <div class="roleCont pd-box">
    <div class="head fx fx-sb">
      <div class="searchBox">
        <t-input
          v-model="params.roleName"
          placeholder="请输入"
          clearable
          @enter="searchHandle"
        >
          <template #suffixIcon>
            <t-icon name="search" class="pt" @click="searchHandle" />
          </template>
        </t-input>
      </div>
      <div class="bt" @click="addRoleHandle">新增角色</div>
    </div>
    <!-- 角色表格 - start - -->
    <div class="roleTable fx-fd-col">
      <div class="tabHead fx" :class="{ 'bd-non': activeIndex === 0 }">
        <div class="fx-1">角色名称</div>
        <div class="fx-1">角色状态</div>
        <div class="fx-1">操作</div>
      </div>
      <div class="tabList pt-rt fx-1">
        <div
          v-for="(item, index) in listData"
          :key="item.id"
          class="fx pt-rt z-1 pt"
          :class="{
            'bd-non': activeIndex === index || activeIndex - 1 === index
          }"
          @click="activeHandle(item, index)"
        >
          <p class="fx-1" :title="item.roleName">{{ item.roleName }}</p>
          <div class="fx-1">
            <span
              :class="`status-dot status-dot-${
                item.dataState === '0' ? '1' : '0'
              }`"
              >{{ item.dataState === '0' ? '启用' : '禁用' }}</span
            >
          </div>
          <div class="fx-1">
            <span
              class="font-del btn-split-right"
              @click="delHandle(item, index)"
              >删除</span
            >
            <a
              :class="`${
                item.dataState === '0' ? 'btn-dl' : ''
              } line btn-split-right`"
              @click="handleClickDisable(item)"
              >{{ item.dataState === '0' ? '禁用' : '启用' }}</a
            >
            <span class="font-bt" @click="editHandle(item)">编辑</span>
          </div>
        </div>
        <div
          v-show="isNoDate"
          class="activeRow"
          :style="{ top: `${activeIndex * 51}px` }"
        >
          <span class="topTag"></span>
          <span class="botTag"></span>
        </div>
        <NoData v-show="!isNoDate"></NoData>
      </div>
      <div class="pageCont">
        <t-pagination
          v-if="total > 10"
          :total="total"
          :showPageSize="false"
          showPreviousAndNextBtn
          :totalContent="false"
          @currentChange="currentChange"
        />
      </div>
    </div>
    <!-- 角色表格 - end - -->
  </div>
  <!-- 新增，编辑弹窗 -->
  <DialogForm
    :visible="visible"
    :title="title"
    :data="DialogFormdata"
    :form-data="formData"
    @handleClose="handleClose"
    @fetchData="fetchData"
  />
  <!-- end -->
  <!-- 删除弹层 -->
  <Delete
    :visible="dialogDeleteVisible"
    :delete-text="deleteText"
    @handle-delete="handleDelete"
    @handle-close="handleClose"
  ></Delete>
  <!-- end -->
  <!-- 禁用启用弹层 -->
  <Disable
    :visible="dialogDisableVisible"
    :dataState="currrentData.dataState"
    @handle-click="handleDisable"
    @handle-close="handleClose"
  ></Disable>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getRolesList, delRoles, editRoles } from '@/api/permission'
import DialogForm from './DialogForm.vue' // 新增,编辑弹窗
import Delete from '@/components/OperateDialog/index.vue' // 删除弹层
import Disable from '@/components/OperateDialog/disable.vue' // 禁用启用弹窗
// 组件
import NoData from '@/components/noData/index.vue'

// 生命周期
onMounted(() => {
  fetchData()
})

const props = defineProps({
  defaultIndex: {
    type: Number,
    default: () => {
      return 0
    }
  }
})
const dialogDisableVisible = ref(false) // 控制禁用/启用弹层显示隐藏
const listData = ref() // 角色列表
const total = ref(0) // 分页总数
const dataLoading = ref(false)
const deleteText = ref('角色') // 删除的内容
const currrentData = ref({} as any)
// 默认参数
const params = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: ''
})
const emit = defineEmits(['clickRow'])
// 获取角色列表数据
const isNoDate = ref(false)
const fetchData = async () => {
  dataLoading.value = true
  getRolesList(params)
    .then((res) => {
      if (res.code === 200) {
        listData.value = res.data.records
        total.value = Number(res.data.total)
        isNoDate.value = total.value !== 0
        emit('clickRow', listData.value[activeIndex.value])
        if (total.value < activeIndex.value + 1) {
          activeHandle(listData.value[0].id, 0)
        }
      } else {
        MessagePlugin.error(res.msg)
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 点击禁用/启用
const handleClickDisable = (row) => {
  currrentData.value = row
  dialogDisableVisible.value = true
}

// 确认禁用/启用
const handleDisable = () => {
  dialogDisableVisible.value = false
  disableDeptData()
}

// 禁用/启用部门
const disableDeptData = async () => {
  editRoles({
    ...currrentData.value,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  }).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success(
        `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
      )
      fetchData()
    }
  })
}

// 点击搜索
const searchHandle = () => {
  params.pageNum = 1
  activeIndex.value = 0
  fetchData()
}

// 打开删除确认按钮
const delId = ref(NaN)
const actInd = ref() // 暂存当前打开的Key 主要删除的是否是当前选中项
const delHandle = (row: { id: number; dataState: String }, index) => {
  if (row.dataState === '0') {
    MessagePlugin.error('启用状态下不可删除')
  } else {
    delId.value = row.id
    actInd.value = index
    dialogDeleteVisible.value = true
  }
}
// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  delDeptData()
}
// 删除菜单
const delDeptData = async () => {
  dataLoading.value = true
  delRoles({ roleIds: delId.value })
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('删除成功')
        dataLoading.value = false
        fetchData()
        if (activeIndex.value === actInd.value) {
          activeIndex.value = 0
        }
      } else {
        MessagePlugin.error(res.msg)
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 添加、编辑角色逻辑
const DialogFormdata = ref({}) // 弹窗表单内容
const formData = ref({ ...params }) // 表单内容
// 角色列表切换
const activeIndex = ref(0) // 角色点击项
const activeHandle = (row, index) => {
  if (activeIndex.value !== index) {
    activeIndex.value = index
    emit('clickRow', row)
  }
}

// 打开添加、编辑弹窗 - 添加角色
const title = ref('新增角色')
const visible = ref(false)
const addRoleHandle = () => {
  title.value = '新增角色'
  visible.value = true
}
// 打开修改弹窗
const editHandle = (row?: any) => {
  if (row) {
    title.value = '编辑角色'
    visible.value = true
    DialogFormdata.value = row
  }
}
// 关闭弹窗
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
  dialogDisableVisible.value = false
  DialogFormdata.value = {}
  // prodDisabledVisible.value = false
}
// 切换分页
const currentChange = (pageInfo) => {
  params.pageNum = pageInfo
  activeIndex.value = 0
  fetchData()
}
watch(
  () => props.defaultIndex,
  (val) => {
    activeIndex.value = val
  }
)
defineExpose({ fetchData })
</script>

<style lang="less" scoped>
.roleAdmin {
  .roleCont {
    background-color: #f2f2f2;
    flex: 1;
    min-width: 392px;
    .fx-1 {
      text-align: left;
    }
    .bt {
      width: 88px;
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
        }
        .fx-1:first-child {
          padding-left: 20px;
        }
      }
      .tabList {
        .fx {
          padding-left: 20px;
        }
        .fx {
          border-bottom: solid 1px var(--color-border);
          .fx-1 {
            white-space: nowrap;
          }
          .fx-1:first-child {
            white-space: nowrap; /* 防止文本换行 */
            overflow: hidden; /* 超出部分隐藏 */
            text-overflow: ellipsis; /* 显示省略号 */
          }
        }
        .font-del,
        .btn-split-right {
          margin-right: 7.5px;
          padding-right: 7.5px;
        }
      }
      .pageCont {
        margin-top: 30px;
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
  }
}
</style>
