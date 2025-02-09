import { MessagePlugin } from 'tdesign-vue-next'
// 获取table新数据
export const getTableData = (rowIndex, val, data) => {
  data[rowIndex].projectName = val.label
  data[rowIndex].projectId = val.value
  data[rowIndex].valueEmpty = false
  return data
}
// 获取护理项目下拉菜单数据
export const getSeleteData = (
  val, // 当前选择的数据
  ind, // 当前选择的索引值
  selectOldData, // 已经选择过的数据（修改前的选项）
  projectBaseData, // 所有护理项目
  cashData // 下拉菜单中要展示的数据
) => {
  // selectOldData.value存储的是点击input选择框已经选择的数据，默认是空
  // 选择框不是空的逻辑（当前的选项 加到  cashData   然后 cashData.value.splice(index, 1)）
  let arr = []
  if (selectOldData) {
    // 1、筛选已经选过的数据，获取已选索引值（需要注意的是这条数据是已经选过老数据而不是新数据）
    const index = projectBaseData.findIndex(
      (item) => item.label === selectOldData
    )
    // 2、选中下拉菜单后，通过以上第一步的索引值把选中前的旧数据重新放到下拉菜单总数据里面
    cashData.push(projectBaseData[index])
    cashData.splice(ind, 1) // 3、然后把已经选中的数据（新数据）从下拉菜单总数据中删除
    arr = cashData
  } else {
    // 如果是新添加了一条计划，直接选择项目后再删除下拉菜单中的数据
    const index = cashData.findIndex((item) => item.value === val.value)
    cashData.splice(index, 1)
    arr = cashData
  }

  return arr
}
// 默认显示一条空的护理计划，新增计划进入到弹层会默认展示一条空的计划
export const getBaseData = () => {
  const obj = {
    key: '0',
    projectId: null,
    executeCycle: 1,
    executeFrequency: 1,
    executeTime: '08:00'
  }
  return [obj]
}
// 获取详情信息
export const getBaseAllData = (projectPlans, cashData) => {
  const arr = []
  let cashArr = []
  let paramsData = []
  let dataArr = []
  if (projectPlans) {
    projectPlans.forEach((ele, i) => {
      // 把数据处理下赋给data，用来回显页面列表数据
      const obj = {
        key: String(i),
        id: ele.id,
        projectId: ele.projectId,
        projectName: ele.projectName,
        executeCycle: ele.executeCycle,
        executeFrequency: ele.executeFrequency,
        executeTime: ele.executeTime
      }
      arr.push(obj)
      // // 护理计划详情回显数据处理
      cashData.forEach((item, i) => {
        if (ele.projectId === item.value) {
          cashData.splice(i, 1)
        }
      })
      cashArr = cashData
    })
    paramsData = arr
    dataArr = arr
  } else {
    paramsData = getBaseData()
    dataArr = getBaseData()
  }
  const obj = {
    cashArr,
    paramsData,
    dataArr
  }
  return obj
}
// 删除一条护理项目
export const deleteProData = (
  val,
  index,
  data,
  paramsData,
  projectBaseData,
  cashData,
  id
) => {
  let cashArr = []
  let dataArr = []
  let paramsArr = []
  data.splice(index, 1)
  if (id === undefined) {
    paramsData.splice(index, 1)
  }

  paramsArr = paramsData
  // 删除数据后，如果已经选择的项目，需要把删除的数据重新添加到项目列表里
  if (val.projectId) {
    projectBaseData.forEach((ele) => {
      if (ele.value === val.projectId) {
        cashData.splice(index, 0, ele)
      }
    })
    cashArr = cashData
  }
  // 删除后重新排序
  data.forEach((obj, i) => {
    obj.key = String(i)
  })
  dataArr = data
  const obj = {
    cashArr,
    dataArr,
    paramsArr
  }
  return obj
}
// 添加一条护理项目
export const addProData = (isAddData, data, paramsData, id) => {
  if (!isAddData) {
    let paramsArr = []
    const obj = {
      key: data.length > 0 ? String(data.length) : '0',
      projectId: null,
      executeCycle: 1,
      executeFrequency: 1,
      executeTime: '08:00'
    }
    data.push(obj)
    console.log(data)
    if (id === undefined) {
      paramsData.push(obj)
    }
    paramsArr = paramsData

    const objData = {
      paramsData,
      data,
      paramsArr
    }
    return objData
  }
}
// 监听输入的执行频次
export const textExecuteBlur = (e, paramsData) => {
  const num = e.executeFrequency
  let arrData = []
  if (num > 7 || num < 0 || num === undefined) {
    MessagePlugin.error('请输入1-7的整数')
  }
  e.executeFrequency = minNum(num)
  // 把处理完的当前修改的频率给paramsData.value
  paramsData.forEach((ele) => {
    if (ele.$index >= 0) {
      if (ele.$index === e.$index) {
        ele.executeFrequency = e.executeFrequency
      }
    } else if (ele.key === e.key) {
      ele.executeFrequency = e.executeFrequency
    }
  })
  arrData = paramsData
  return arrData
}
// 当前输入的排序小于等于7的时候显示1
const minNum = (val) => {
  if (val === undefined || val < 1) {
    return 1
  }
  if (val > 7) {
    return 7
  }
  return val
}
