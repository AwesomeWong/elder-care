<!-- 权限管理 - 职位管理 -->
<template>
  <div class="postAdmin min-h contentBox bg-wt fx br-2">
    <!-- 左半部分树 -->
    <div class="left">
      <Tree :treeData="treeData" @getTreeData="getTableData" />
    </div>
    <!-- 右半部分列表 -->
    <div class="right">
      <div>
        <div class="baseList">
          <!-- 筛选区域 -->
          <searchFormBox
            @handleSearch="handleSearch"
            @handleReset="handleReset"
          ></searchFormBox>
          <!-- end -->
          <!-- 表格 -->
          <tableList
            :list-data="listData"
            :pagination="pagination"
            @handleSetupContract="handleSetupContract"
            @handleBulid="handleBulid"
            @handleClickDelete="handleClickDelete"
            @fetchData="fetchData"
            @get-current="getCurrent"
            @handleClickDisable="handleClickDisable"
          ></tableList>
        </div>
      </div>
    </div>

    <!-- end -->
    <!-- 新增，编辑弹窗 -->
    <dialog-form
      :visible="visible"
      :title="title"
      :data="DialogFormdata"
      :treeData="diaLogTreeData"
      :form-data="formData"
      @handleClose="handleClose"
      @fetchData="fetchData"
    />
    <!-- end -->
    <!-- 生产环境禁用操作弹窗 -->
    <ProdDisabled
      :confirm-visible="prodDisabledVisible"
      @handleClose="handleClose"
    ></ProdDisabled>
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
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, watch, reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import {
  getPostPageList,
  delPost,
  getDeptTree,
  editPost
} from '@/api/permission'
import DialogForm from './components/DialogForm.vue' // 新增,编辑弹窗.
import ProdDisabled from '@/components/Message/ProdDisabled.vue' // 删除弹窗
import Delete from '@/components/OperateDialog/index.vue' // 删除弹层
import Disable from '@/components/OperateDialog/disable.vue' // 禁用启用弹窗
import tableList from './components/TableList.vue' // 表格
import searchFormBox from './components/SearchForm.vue' // 搜索框表单
import Tree from '@/pages/permission/user/components/Tree.vue' // 左侧树

const visible = ref(false) // 新增，编辑弹窗
const listData = ref({}) // 列表数据
const dataLoading = ref(false)
const DialogFormdata = ref({} as any) // 弹窗表单内容
const title = ref('新增职位') // 弹窗标题
const dialogDeleteVisible = ref(false) // 控制删除弹层显示隐藏
const dialogDisableVisible = ref(false) // 控制禁用/启用弹层显示隐藏
const deleteText = ref('职位') // 删除的内容
const prodDisabledVisible = ref(false) // 生产环境禁用操作弹窗
const route = useRoute()
const url = ref('')
// 获取树列表数据
const treeData = ref()
const diaLogTreeData = ref()
const currrentData = ref({} as any)
const activeDeptno = ref('')

// 分页
const pagination = reactive({
  pageSize: 10,
  total: 0,
  pageNum: 1 // 默认当前页
})

// 搜索框表单
const searchForm = {
  PostName: '',
  dataState: undefined
}
// 监听路由变化
watch(
  () => route.path,
  (newValue) => {
    url.value = newValue
    // fetchData(pagination.value)
  }
)
const formData = ref({ ...searchForm }) // 表单内容
// 生命周期
onMounted(() => {
  // fetchData()
  getTreeData()
})
// 获取部门树列表数据
const getTreeData = async () => {
  dataLoading.value = true
  const res = await getDeptTree()
  console.log(res, 'res')
  if (res && res.code === 200) {
    diaLogTreeData.value = res.data.items
    treeData.value = treeProps(res.data.items)
    // deptId.value = (res.data.items[0] as any).id
    // getTableData()
  }
}

// 数据处理
const treeProps = (value) => {
  let data = []
  data = value
    ? value.map((el) => ({
        value: el.id,
        label: el.label,
        children: treeProps(el.children)
      }))
    : []
  return data
}

// 搜索功能
const handleSearch = (val) => {
  // console.log('1111111')
  pagination.pageNum = 1
  pagination.pageSize = 10
  // 根据搜索框的内容进行搜索
  fetchData(val)
}
// 重置，清空搜索框
const handleReset = (val) => {
  pagination.pageNum = 1
  pagination.pageSize = 10
  // 清空搜索框的全部内容并且重新获取数据
  fetchData(val)
}
//
const getTableData = (val) => {
  console.log(val, '---------')
  let deptId = ''
  if (val && val.length > 0) {
    deptId = val[0]
    activeDeptno.value = deptId
    DialogFormdata.value = { deptNo: deptId }
  }
  fetchData({ deptNo: activeDeptno.value })
}
// 获取列表数据
const fetchData = async (val?: Object) => {
  const params = { ...val, ...pagination, deptNo: activeDeptno.value }
  dataLoading.value = true
  getPostPageList(params)
    .then((res) => {
      if (res.code === 200) {
        listData.value = res.data.records
        pagination.total = Number(res.data.total)
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
} // 点击禁用/启用
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
  editPost({
    ...currrentData.value,
    dataState: currrentData.value.dataState === '0' ? '1' : '0'
  })
    .then((res) => {
      console.log(res, 'err')
      if (res.code === 200) {
        MessagePlugin.success(
          `${currrentData.value.dataState === '0' ? '禁用' : '启用'}成功`
        )
        getTableData([activeDeptno.value])
      }
    })
    .catch((err) => {
      console.log(err, 'err')
      MessagePlugin.error(err.msg || `请求出错了！ 操作失败`)
    })
}

const delId = ref(NaN)
// 点击删除
const handleClickDelete = (row: { postNo: number; dataState: String }) => {
  if (row.dataState === '0') {
    MessagePlugin.error('启用状态下不可删除')
  } else {
    delId.value = row.postNo
    dialogDeleteVisible.value = true
  }
}
// 确认删除
const handleDelete = () => {
  dialogDeleteVisible.value = false
  delPostData()
}
// 删除职位
const delPostData = async () => {
  dataLoading.value = true
  delPost(delId.value)
    .then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('删除成功')
        dataLoading.value = false
        getTableData([activeDeptno.value])
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  dialogDeleteVisible.value = false // 关闭删除弹层
  prodDisabledVisible.value = false
  dialogDisableVisible.value = false
}
// 点击新建
const handleBulid = () => {
  title.value = '新增职位'
  // // 显示新建弹窗
  visible.value = true
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.pageNum = val.current
  pagination.pageSize = val.pageSize
  fetchData()
}
// 点击编辑
const handleSetupContract = (val) => {
  // 深拷贝
  DialogFormdata.value = JSON.parse(JSON.stringify(val))
  // 显示新建弹窗
  visible.value = true
  // 将弹窗的标题改为新建
  title.value = '编辑职位'
}
</script>
<style lang="less" scoped src="../index.less"></style>
<style lang="less" scoped>
.postAdmin {
  .left {
    width: 223px;
    background: #ffffff;
    padding: var(--space-main);
    border-right: 1px solid var(--color-border);
  }
  .right {
    width: 100%;
    background: #ffffff;
  }
}
</style>
