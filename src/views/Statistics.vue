<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model:value="dateType">
          <radio-button label="year">年</radio-button>
          <radio-button label="year-month">月</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <div class="date" @click="showDatePicker = true">
      {{ dateStr }}&#9660;
    </div>
    <radio-group v-model:value="moneyType" block style="margin: 10px 6px">
      <radio-button label="expenditure">支出</radio-button>
      <radio-button label="income">收入</radio-button>
    </radio-group>
    <div class="echarts-container" v-if="categoryRankData.length !== 0" >
      <async-echarts class="charts" height="200px" :option="option"/>
    </div>
    <div v-if="categoryRankData.length === 0" class="backup-message">暂无数据</div>
    <ol v-else class="category-rank-list">
      <li class="rank-list-item" v-for="item in categoryRankData" :key="item.category.id">
        <div class="icon-wrapper">
          <category-icon class="icon" size="24px" :name="item.category.icon"/>
        </div>
        <div class="info">
          <span class="text-info">
            <span class="icon-name">{{ item.category.name }}</span>
            <span class="percent">{{ item.percent.toFixed(2) }}%</span>
            <span class="amount">{{ item.sum }}</span>
          </span>
          <div class="percent-bar" :style="{width: item.percent + '%'}"></div>
        </div>
      </li>
    </ol>
    <pop-up v-model:show="showDatePicker" position="bottom">
      <DatePicker :type="dateType" v-model:date="curDate" @ok="showDatePicker = !showDatePicker"/>
    </pop-up>
  </layout>
</template>

<script lang="ts">
import {defineComponent, defineAsyncComponent, ref, computed, h} from 'vue'
import Layout from "/@/components/Layout.vue";
import NavBar from "/@/components/NavBar.vue";
import DatePicker from "/@/components/DatePicker/DatePicker.vue";
import PopUp from "/@/components/PopUp.vue";
import TopBar from "/@/components/TopBar.vue";
import RadioButton from "/@/components/Radio/RadioButton.vue";
import RadioGroup from "/@/components/Radio/RadioGroup.vue";
import CategoryIcon from "/@/views/common/CategoryIcon.vue";
import Spinner from '@wing-ui/icons-vue3/lib/Spinner'
// import VEcharts from "/@/components/VEcharts.vue";
import dayjs from "dayjs";
import {EChartOption} from "echarts";
import {getCategoryById, getRecords, getRecordsByTime} from "/@/store/utils";
import {useStore} from "vuex";

type CategoryToRecordsMap = { [categoryId: number]: MoneyRecord[] }
type CategoryToSumMap = { [categoryId: number]: number }

const AsyncEcharts = defineAsyncComponent({
  loader: () => import("/@/components/VEcharts.vue"),
  delay: 200,
  timeout: 3000,
  errorComponent: {render: () => h('div',  'loading echarts error')},
  loadingComponent: {
    render: () => h('div', {
      style: {display: 'flex', alignItems: 'center'}
      }, [
        h(Spinner, {style: {
            animation: "spin 1000ms infinite linear",
            marginRight: "10px"
          }}),
        'loading echarts'
    ])}
})

export default defineComponent({
  components: {
    Spinner,
    Layout,
    NavBar,
    DatePicker,
    PopUp,
    TopBar,
    RadioButton,
    RadioGroup,
    AsyncEcharts,
    // VEcharts,
    CategoryIcon,
  },
  setup() {
    const monthArr = Array(12).fill(0).map((_, index) => index + 1)
    const store = useStore()
    const categoryList = computed(() => {
      return store.state.category.categoryList as Category[]
    })
    const recordList = computed(() => {
      return store.state.record.recordList as MoneyRecord[]
    })
    const dateType = ref('year-month')
    const curDate = ref(new Date())
    const showDatePicker = ref(false)
    const moneyType = ref<MoneyType>('expenditure')

    const dateArr = computed(() => {
      return Array(dayjs(curDate.value).daysInMonth()).fill(0).map((_, index) => index + 1)
    })
    const dateStr = computed(() => {
      if (dateType.value === 'year') {
        return dayjs(curDate.value).format('YYYY年')
      } else {
        return dayjs(curDate.value).format('YYYY年M月')
      }
    })
    // echarts 在es module引入的情况下有bug，点击legend会报错，而且无法显示tooltip
    // 所以以下事件先注释掉了
    // const handleLegendChanged = (name: string) => {
    //   if (name === '收入') {
    //     moneyType.value = 'income'
    //   }
    //   if (name === '支出') {
    //     moneyType.value = 'expenditure'
    //   }
    // }
    // const echartsListeners = {
    //   'legendselectchanged': (e: { type: string; name: string; select: object }) => {
    //     console.log('listen')
    //     handleLegendChanged(e.name)
    //   }
    // }
    const getSumByDates = (records: MoneyRecord[], date: Date) => {
      records = getRecordsByTime(records, date, 'month')
      const ret = {
        income: dateArr.value.map(_ => 0),
        expenditure: dateArr.value.map(_ => 0)
      }
      return records.reduce((acc, record) => {
        acc[record.moneyType][dayjs(record.createAt).date() - 1] += record.amount
        return acc
      }, ret)
    }

    const getSumForMonths = (records: MoneyRecord[], date: Date) => {
      records = getRecordsByTime(records, date, 'year')
      const ret: {
        income: number[];
        expenditure: number[];
      } = {
        income: monthArr.map(_ => 0),
        expenditure: monthArr.map(_ => 0)
      }
      return records.reduce((acc, record) => {
        acc[record.moneyType][dayjs(record.createAt).month()] += record.amount
        return acc
      }, ret)
    }

    const getSumsForCategories = (records: MoneyRecord[]): CategoryToSumMap => {
      function getCategoryToRecordMap(records: MoneyRecord[]) {
        const map: CategoryToRecordsMap = {}
        return records.reduce((acc, record) => {
          if (acc[record.categoryId]) {
            acc[record.categoryId].push(record)
          } else {
            acc[record.categoryId] = [record]
          }
          return acc
        }, map)
      }

      const map = getCategoryToRecordMap(records)
      const ret: { [categoryId: number]: number } = {}
      for (const i in map) {
        if (!Object.prototype.hasOwnProperty.call(map, i)) continue
        ret[i] = map[i].reduce((acc, record) => acc + record.amount, 0)
      }
      return ret
    }

    const categoryRankData = computed(() => {
      let records = recordList.value
      records = dateType.value === 'year-month' ?
          getRecordsByTime(records, curDate.value, 'month') : getRecordsByTime(records, curDate.value, 'year')
      records = getRecords(records, {
        moneyType: moneyType.value
      })

      const sumsForCategories = getSumsForCategories(records)
      const ret = Object.entries(sumsForCategories)
      const total = ret.reduce((acc, item) => acc + item[1], 0)
      ret.sort((a, b) => b[1] - a[1])
      return ret.map(item => {
        return {
          category: getCategoryById(categoryList.value, parseInt(item[0])),
          sum: item[1],
          percent: item[1] / total * 100
        }
      })
    })
    const option = computed<EChartOption>(() => {
      const xSeriesData = dateType.value === 'year-month' ? dateArr.value : monthArr
      const ySeriesData = dateType.value === 'year-month' ?
          getSumByDates(recordList.value, curDate.value) : getSumForMonths(recordList.value, curDate.value)

      return {
        tooltip: {
          show: true,
          trigger: 'axis',
          transitionDuration: 0,
          formatter: `{b}${dateType.value === 'year' ? '月' : '日'}<br/>{a} : {c}元`,
          textStyle: {
            fontSize: 12,
          },
          confine: true,
          position: function (point) {
            return [point[0], '30%']
          }
        },
        grid: {
          top: 40,
          bottom: 20,
          left: 10,
          right: 10
        },
        color: ['#25b864'],
        title: {
          text: `${dateType.value === 'year' ? '年' : '月'}度趋势图`,
          top: 10,
          left: 6,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        // echarts es6 module下会有点击报错bug
        // legend: {
        //   selectedMode: 'single',
        //   top: 10,
        //   icon: 'roundRect',
        //   textStyle: {
        //     fontSize: 16,
        //   }
        // },
        xAxis: {
          type: 'category',
          data: xSeriesData,
          axisTick: {
            show: false
          },
        },
        yAxis: {
          type: 'value',
          show: false
        },
        // 因为echarts的es6版本有bug无法实现单选切换，所以只使用单个数据源
        series: [moneyType.value === 'expenditure' ? {
          name: '支出',
          seriesLayoutBy: 'row',
          type: 'line',
          symbol: 'emptycircle',
          symbolSize: 6,
          lineStyle: {
            color: '#bbb',
            width: 1,
          },
          data: ySeriesData['expenditure']
        } : {
          name: '收入',
          seriesLayoutBy: 'row',
          type: 'line',
          symbol: 'emptycircle',
          symbolSize: 6,
          lineStyle: {
            color: '#bbb',
            width: 1,
          },
          data: ySeriesData['income']
        }]
      }
    })
    return {
      option,
      dateType,
      dateStr,
      categoryRankData,
      curDate,
      showDatePicker,
      moneyType,
    }
  }
})




</script>

<style lang="scss" scoped>
@import '../style/variable';

.charts {
  flex-shrink: 0;
}

.date {
  text-align: center;
  color: $brand-color;
  background-color: $grey-1;
  line-height: 30px;
}

.category-rank-list {
  padding: 10px;

  .rank-list-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid $grey-2;

    .icon-wrapper {
      width: 40px;
      height: 40px;
      background-color: $grey-1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin-right: 10px;

      .icon {
        fill: $brand-color;
      }
    }

    .info {
      flex: 1;

      .text-info {
        display: flex;
        align-items: center;

        .percent {
          font-size: 12px;
          margin-left: 6px;
        }

        .amount {
          margin-left: auto;
        }
      }

      .percent-bar {
        margin: 4px 0;
        height: 6px;
        width: 100%;
        border-radius: 5px;
        background-color: $brand-color;
      }
    }
  }
}

.backup-message {
  color: $grey-5;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
.echarts-container {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.loading-icon {
}
</style>
