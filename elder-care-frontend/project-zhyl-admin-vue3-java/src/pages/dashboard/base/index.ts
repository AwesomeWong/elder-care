import dayjs from 'dayjs'
// import { TChartColor } from '@/config/color'
import { getChartListColor } from '@/utils/color'
import { getRandomArray } from '@/utils/charts'
import { TODAY_NUM_A, TODAY_TIME } from './constants'
/** 首页 dashboard 折线图 */
export function constructInitDashboardDataset(type: string) {
  const dateArray: Array<string> = [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
  ]
  const datasetAxis = {
    xAxis: {
      type: 'category',
      show: false,
      data: dateArray
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }

  if (type === 'line') {
    const lineDataset = {
      ...datasetAxis,
      color: ['#fff'],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 0,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          lineStyle: {
            width: 2
          }
        }
      ]
    }
    return lineDataset
  }
  const barDataset = {
    ...datasetAxis,
    color: getChartListColor(),
    series: [
      {
        data: [
          100,
          130,
          184,
          218,
          {
            value: 135,
            itemStyle: {
              opacity: 0.2
            }
          },
          {
            value: 118,
            itemStyle: {
              opacity: 0.2
            }
          },
          {
            value: 60,
            itemStyle: {
              opacity: 0.2
            }
          }
        ],
        type,
        barWidth: 9
      }
    ]
  }
  return barDataset
}

/** 柱状图数据源 */
export function constructInitDataset({
  dateTime = [],
  placeholderColor,
  borderColor
}: { dateTime: Array<string> } & any) {
  const divideNum = 10
  const timeArray = []
  const inArray = []
  const outArray = []
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number =
        (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) /
        divideNum
      const enhandTime: number =
        new Date(dateTime[0]).getTime() + dateAbsTime * i
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'))
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('YYYY-MM-DD')
      )
    }

    inArray.push(getRandomArray().toString())
    outArray.push(getRandomArray().toString())
  }

  const dataset = {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      axisLabel: {
        color: placeholderColor
      },
      axisLine: {
        lineStyle: {
          color: getChartListColor()[1],
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor
      },
      splitLine: {
        lineStyle: {
          color: borderColor
        }
      }
    },
    grid: {
      top: '5%',
      left: '25px',
      right: 0,
      bottom: '60px'
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 48,
      textStyle: {
        fontSize: 12,
        color: placeholderColor
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['本月', '上月']
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'bar'
      },
      {
        name: '上月',
        data: inArray,
        type: 'bar'
      }
    ]
  }

  return dataset
}

/**
 *  线性图表数据源
 */
export function getLineChartDataSet(
  { placeholderColor, borderColor },
  data,
  time
) {
  const dataSet = {
    color: ['#4D8DFF', '#00B8A0'],
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          relVal += `<br/>${params[i].marker}${params[i].seriesName} ${params[i].value}元`
        }
        return relVal
      }
    },
    grid: {
      left: '0',
      right: '20px',
      top: '30px',
      bottom: '0',
      containLabel: true
    },
    legend: false, // 隐藏图例
    xAxis: {
      type: 'category',
      data: time,
      boundaryGap: false,
      axisLabel: {
        color: '#595959'
      },
      axisLine: {
        lineStyle: {
          width: 1,
          color: borderColor
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#595959'
      },
      // nameGap: 15, // 坐标轴名称与轴线间距离
      // min: 0,
      // max: 100,
      splitLine: {
        lineStyle: {
          type: 'dashed', // 线的类型
          color: borderColor
        }
      }
    },
    series: [
      {
        name: '收入金额',
        data: data.incomeData,
        type: 'line',
        smooth: true
      },
      {
        name: '退款金额',
        data: data.refundData,
        type: 'line',
        smooth: true
      }
    ]
  }
  return dataSet
}
// 入退情况
/**
 *  柱状图表数据源
 */
export function getIncomeChartDataSet(
  { placeholderColor, borderColor },
  data,
  time
) {
  const dataSet = {
    color: ['#4D8DFF', '#00B8A0'],
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          relVal += `<br/>${params[i].marker}${params[i].seriesName} ${params[i].value}人`
        }
        return relVal
      }
    },
    grid: {
      left: '0',
      right: '20px',
      top: '30px',
      bottom: '0',
      containLabel: true
    },
    legend: false, // 隐藏图例
    // legend: {
    //   icon: 'rect',
    //   itemWidth: 12,
    //   itemHeight: 4,
    //   itemGap: 48,
    //   left: 'right',
    //   // top: '0',
    //   // orient: 'horizontal', // legend 横向布局。
    //   data: ['入住人数', '退住人数']
    //   // textStyle: {
    //   //   fontSize: 12,
    //   //   color: placeholderColor
    //   // }
    // },
    xAxis: {
      type: 'category',
      data: time,
      axisLabel: {
        color: '#595959'
      },
      axisLine: {
        lineStyle: {
          width: 1,
          color: borderColor
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#595959'
      },
      // nameGap: 15, // 坐标轴名称与轴线间距离
      // min: 0,
      // max: 100,
      splitLine: {
        lineStyle: {
          type: 'dashed', // 线的类型
          color: borderColor
        }
      }
    },
    series: [
      {
        name: '入住人数',
        data: data.incomeData,
        type: 'bar',
        smooth: true,
        barWidth: '10px'
      },
      {
        name: '退住人数',
        data: data.refundData,
        type: 'bar',
        smooth: true,
        barWidth: '10px'
      }
    ]
  }
  return dataSet
}
/**
 *  线性图表数据源
 */
export function getServeChartDataSet(
  { placeholderColor, borderColor },
  data,
  time
) {
  console.log(data, 156)
  console.log(time, 156)
  const dataSet = {
    color: ['#00B8A0'],
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          relVal += `<br/>${params[i].marker}${params[i].seriesName} ${params[i].value}次`
        }
        return relVal
      }
    },
    grid: {
      left: '0',
      right: '20px',
      top: '30px',
      bottom: '0',
      containLabel: true
    },
    legend: false, // 隐藏图例
    xAxis: {
      type: 'category',
      data: time,
      boundaryGap: false,
      axisLabel: {
        color: '#595959'
      },
      axisLine: {
        lineStyle: {
          width: 1,
          color: borderColor
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#595959'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // 线的类型
          color: borderColor
        }
      }
    },
    series: [
      {
        name: '收入金额',
        data,
        type: 'line',
        smooth: true
      }
    ]
  }
  return dataSet
}
/**
 * 获取饼图数据
 *
 * @export
 * @param {number} [num=1]
 * @returns {*}
 */
export function getOldPieChartDataSet({ textColor, containerColor }, data) {
  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人'
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: false, // 隐藏图例
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: [`{value|${data.total}人}`, '{name|老人总数}'].join('\n'),
          rich: {
            value: {
              color: textColor,
              fontSize: 18,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  }
}
// 床位数量
export function getBedPieChartDataSet({ textColor, containerColor }, data) {
  return {
    color: ['#d7f1ed', '#689FFF'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 个'
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: false, // 隐藏图例
    series: [
      {
        name: '床位数量',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: [`{value|${data.total}个}`, '{name|床位数量}'].join('\n'),
          rich: {
            value: {
              color: textColor,
              fontSize: 18,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  }
}
// 服务数量
export function getservePieChartDataSet({ textColor, containerColor }, data) {
  return {
    color: ['#d7f1ed', '#ADA5EE'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} w笔'
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: false, // 隐藏图例
    series: [
      {
        name: '床服务单数量',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: [`{value|${data.total}w笔}`, '{name|服务单数量}'].join(
            '\n'
          ),
          rich: {
            value: {
              color: textColor,
              fontSize: 18,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  }
}
// 员工数量
export function getStaffPieChartDataSet({ textColor, containerColor }, data) {
  return {
    color: ['#d7f1ed', '#FFB056'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人'
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: false, // 隐藏图例
    series: [
      {
        name: '员工数量',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: [`{value|${data.total}人}`, '{name|员工数量}'].join('\n'),
          rich: {
            value: {
              color: textColor,
              fontSize: 18,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  }
}
// 收入金额
export function getMoneyPieChartDataSet({ textColor, containerColor }, data) {
  return {
    color: ['#d7f1ed', '#FE8585'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} w元'
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: false, // 隐藏图例
    series: [
      {
        name: '收入金额',
        type: 'pie',
        radius: ['65%', '80%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: [`{value|${data.total}w元}`, '{name|收入金额}'].join('\n'),
          rich: {
            value: {
              color: textColor,
              fontSize: 18,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 14,
              lineHeight: 14
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.data
      }
    ]
  }
}
