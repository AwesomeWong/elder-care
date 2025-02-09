<!-- 账单明细 -->
<template>
  <t-card title="账单明细">
    <div class="details">
      <!-- 月度账单 -->
      <div class="billTable">
        <div class="table">
          <table v-if="baseData.billType === 0">
            <tr>
              <th>类型</th>
              <th>费用项目</th>
              <th>服务内容</th>
              <th>金额（元）</th>
            </tr>
            <tr>
              <td>添加项</td>
              <td>护理费用</td>
              <td>{{ baseData.lname }}</td>
              <td>
                {{
                  baseData.checkInConfigVo.nursingCost
                    ? decimalsReplenish(baseData.checkInConfigVo.nursingCost)
                    : '0.00'
                }}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>床位费用</td>
              <td>{{ baseData.typeName }}</td>
              <td>
                {{
                  baseData.checkInConfigVo.bedCost
                    ? decimalsReplenish(baseData.checkInConfigVo.bedCost)
                    : '0.00'
                }}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>其他费用</td>
              <td>其他</td>
              <td>
                {{
                  baseData.checkInConfigVo.otherCost
                    ? decimalsReplenish(baseData.checkInConfigVo.otherCost)
                    : '0.00'
                }}
              </td>
            </tr>
            <tr>
              <td>小计</td>
              <td></td>
              <td></td>
              <td>
                <strong>{{
                  decimalsReplenish(baseData.checkInConfigVo.add1)
                }}</strong>
              </td>
            </tr>
            <tr>
              <td>扣减项</td>
              <td>医保支付</td>
              <td>--</td>
              <td>
                {{
                  baseData.checkInConfigVo.medicalInsurancePayment
                    ? '- ' +
                      decimalsReplenish(
                        baseData.checkInConfigVo.medicalInsurancePayment
                      )
                    : '0.00'
                }}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>政府补贴</td>
              <td>--</td>
              <td>
                {{
                  baseData.checkInConfigVo.governmentSubsidy
                    ? '- ' +
                      decimalsReplenish(
                        baseData.checkInConfigVo.governmentSubsidy
                      )
                    : '0.00'
                }}
              </td>
            </tr>
            <tr>
              <td>小计</td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  -{{
                    decimalsReplenish(baseData.checkInConfigVo.add2)
                  }}</strong
                >
              </td>
            </tr>
            <tr>
              <td>每月应付</td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  {{
                    decimalsReplenish(baseData.checkInConfigVo.monthCost)
                  }}</strong
                >
              </td>
            </tr>
            <tr>
              <td>本期应付</td>
              <td></td>
              <td></td>
              <td>
                {{ decimalsReplenish(baseData.currentCost) }}
              </td>
            </tr>
            <tr>
              <td>押金</td>
              <td></td>
              <td></td>
              <td>{{ decimalsReplenish(baseData.depositAmount) }}</td>
            </tr>

            <tr>
              <td>账单金额</td>
              <td></td>
              <td></td>
              <td>
                <strong> {{ decimalsReplenish(baseData.billAmount) }}</strong>
              </td>
            </tr>
            <tr>
              <td>预缴款支付</td>
              <td></td>
              <td></td>
              <td>{{ decimalsReplenish(baseData.prepaidAmount) }}</td>
            </tr>
            <tr>
              <td>应付金额</td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  {{ decimalsReplenish(baseData.payableAmount) }}</strong
                >
              </td>
            </tr>
          </table>
          <!-- 费用账单 -->
          <table v-else class="tableTwo">
            <tr>
              <th>类型</th>
              <th>费用项目</th>
              <th>服务内容</th>
              <th>金额（元）</th>
            </tr>
            <tr>
              <td>添加项</td>
              <td>服务下单</td>
              <td>{{ baseData.remark }}</td>
              <td>
                <strong> {{ decimalsReplenish(baseData.currentCost) }}</strong>
              </td>
            </tr>
            <tr>
              <td>应付金额</td>
              <td></td>
              <td></td>
              <td>
                <strong class="font16">
                  {{ decimalsReplenish(baseData.payableAmount) }}</strong
                >
              </td>
            </tr>
          </table>
          <!-- end -->
        </div>
        <!-- end -->
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { decimalsReplenish } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
