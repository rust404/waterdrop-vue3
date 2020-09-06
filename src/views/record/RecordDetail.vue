<template>
  <layout>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <template v-slot:header>
      <top-bar class="detail-top-bar">水滴记账</top-bar>
      <div class="general">
        <div class="income">
          <span>{{ getRecordSumByMoneyType(selectedRecords, 'income') }}</span>
          <span>{{ selectedMonth + 1 }}月收入</span>
        </div>
        <div class="time">
          <span class="month" @click="showDatePicker = true">{{ selectedMonth + 1 }}月&#9660;</span>
          <span class="year">{{ selectedYear }}年</span>
        </div>
        <div class="expenditure">
          <span>{{ getRecordSumByMoneyType(selectedRecords, 'expenditure') }}</span>
          <span>{{ selectedMonth + 1 }}月支出</span>
        </div>
      </div>
    </template>
    <div class="detail" v-if="sortedDateAndRecordGroup.length > 0">
      <div class="group-by-date" v-for="(item, index) in sortedDateAndRecordGroup" :key="index">
        <div class="date-record-general">
          <span class="date">{{ getFormattedDate(item[0]) }}</span>
          <span class="income">收入：{{ getRecordSumByMoneyType(item[1], 'income') }}</span>
          <span class="expenditure">支出：{{ getRecordSumByMoneyType(item[1], 'expenditure') }}</span>
        </div>
        <ul class="date-record-detail">
          <li v-for="record in item[1]" :key="record.id" @click="router.push(`/record/edit/${record.id}`)">
              <span class="category-icon-wrapper">
                <category-icon size="20px" class="category-icon" :name="getCategoryIcon(record.categoryId)"/>
              </span>
            <span class="category-name">{{ getCategoryName(record.categoryId) }}</span>
            <span class="amount">{{ record.moneyType === 'expenditure' ? '-' : '' }}{{ record.amount }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="backup-message">
      当月暂无数据
    </div>
    <pop-up v-model:show="showDatePicker" position="bottom">
      <DatePicker type="year-month" v-model:date="selectedTime" @ok="showDatePicker = !showDatePicker"/>
    </pop-up>
  </layout>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import Layout from "/@/components/Layout.vue";
import NavBar from "/@/components/NavBar.vue";
import TopBar from "/@/components/TopBar.vue";
import PopUp from "/@/components/PopUp.vue";
import DatePicker from "/@/components/DatePicker/DatePicker.vue";
import CategoryIcon from "/@/views/common/CategoryIcon.vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import {getCategoryById, getRecordsByTime} from "/@/store/utils";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'RecordDetail',
  components: {
    Layout,
    NavBar,
    TopBar,
    PopUp,
    DatePicker,
    CategoryIcon
  },
  setup() {
    const router = useRouter()
    const selectedTime = ref(new Date())
    const showDatePicker = ref(false)
    const store = useStore()
    const categoryList = computed(() => {
      return store.state.category.categoryList as Category[]
    })
    const recordList = computed(() => {
      return store.state.record.recordList as MoneyRecord[]
    })
    const getFormattedDate = (date: Date | string | number) => {
      const str = '日一二三四五六'
      return dayjs(date).format('M月D日 星期') + str[dayjs(date).day()]
    }
    const getRecordSumByMoneyType = (records: MoneyRecord[], type: MoneyType) => {
      const sum = records.reduce((acc, record) => {
        if (record.moneyType === type) {
          acc += record.amount
        }
        return acc
      }, 0)
      return sum.toFixed(2).replace(/\.00$/, '')
    }
    const selectedMonth = computed(() => {
      return dayjs(selectedTime.value).month()
    })
    const selectedYear = computed(() => {
      return dayjs(selectedTime.value).year()
    })
    const selectedRecords = computed(() => {
      return getRecordsByTime(recordList.value, selectedTime.value, 'month')
    })
    const sortedDateAndRecordGroup = computed((): [string, MoneyRecord[]][] => {
      const map = selectedRecords.value.reduce((acc, record) => {
        const key = dayjs(record.createAt).format('YYYY-MM-DD')
        if (Object.prototype.hasOwnProperty.call(acc, key)) {
          acc[key].push(record)
        } else {
          acc[key] = [record]
        }
        return acc
      }, {} as { [index: string]: MoneyRecord[] })
      return Object.entries(map).sort((a, b) => {
        const dateA = dayjs(a[0]).date()
        const dateB = dayjs(b[0]).date()
        return dateB - dateA
      })
    })
    const getCategoryIcon = (id: number) => {
      const category = getCategoryById(categoryList.value, id)
      return category ? category.icon : ''
    }
    const getCategoryName = (id: number) => {
      const category = getCategoryById(categoryList.value, id)
      return category ? category.name : ''
    }
    return {
      getRecordSumByMoneyType,
      selectedRecords,
      selectedMonth,
      selectedYear,
      sortedDateAndRecordGroup,
      getFormattedDate,
      showDatePicker,
      selectedTime,
      router,
      getCategoryIcon,
      getCategoryName,
    }
  }
})

</script>

<style lang="scss" scoped>
@import "../../style/variable";

.detail-top-bar {
  box-shadow: none;
}

.general {
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;

  .income,
  .time,
  .expenditure {
    display: flex;
    flex-direction: column;
    align-items: center;

    > :first-child {
      font-size: 20px;
      line-height: 30px;
    }
  }
}

.detail {
  .group-by-date {
    .date-record-general {
      display: flex;
      font-size: 10px;
      line-height: 30px;
      padding: 0 20px;
      background-color: $grey-2;
      color: $grey-6;

      .income {
        margin-left: auto;
        margin-right: 6px;
      }
    }

    .date-record-detail {
      > li {
        display: flex;
        align-items: center;
        line-height: 30px;
        padding: 12px 20px;

        .category-icon-wrapper {
          width: 36px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 18px;
          background-color: $brand-color;

          .category-icon {
            color: #fff;
          }
        }

        .category-name {
          margin-left: 10px;
        }

        .amount {
          margin-left: auto;
          font-size: 20px;
        }
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
</style>
