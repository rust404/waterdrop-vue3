<template>
  <div class="datepicker">
    <div class="date-picker-header">
      <button class="cancel-btn" @click="onCancel">取消</button>
      <header class="title">{{dateStr}}</header>
      <button class="ok-btn" @click="onOk">确定</button>
    </div>
    <div class="picker-container">
      <picker-list v-if="showYear" v-model:value="year" :list-data="yearList"/>
      <picker-list v-if="showMonth" v-model:value="month" :list-data="monthList"/>
      <picker-list v-if="showDate" v-model:value="date" :list-data="dateList"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed, ref} from 'vue'
import dayjs from 'dayjs';
import PickerList from "./PickerList.vue";

export type DatePickerType = 'year' | 'full-date' | 'year-month' | 'month-date'

export default defineComponent({
  components: {
    PickerList
  },
  props: {
    date: Date,
    type: {
      type: String as PropType<DatePickerType>,
      default: 'full-date'
    }
  },
  emits: ['update:date', 'ok', 'cancel'],
  setup(props, {emit}) {
    const year = ref(dayjs(props.date).year())
    // 从 1 开始
    const month = ref(dayjs(props.date).month() + 1)
    const date = ref(dayjs(props.date).date())

    const yearList = []
    for (let i = 0; i < 20; i++) {
      yearList.unshift(year.value - i)
    }

    const showYear = computed(() => {
      return props.type === 'full-date' || props.type === 'year-month' || props.type === 'year'
    })
    const showMonth = computed(() => {
      return props.type === 'full-date' || props.type === 'year-month' || props.type === 'month-date'
    })
    const showDate = computed(() => {
      return props.type === 'full-date' || props.type === 'month-date'
    })
    const dateStr = computed(() => {
      if (props.type === 'full-date') {
        return `${year.value}-${month.value}-${date.value}`
      }
      if (props.type === 'month-date') {
        return `${month.value}-${date.value}`
      }
      if (props.type === 'year-month') {
        return `${year.value}-${month.value}`
      }
      return ''
    })

    const daysInMonth = computed(() => {
      return dayjs().year(year.value).month(month.value - 1).daysInMonth()
    })

    const monthList = Array(12).fill(0).map((item, index) => index + 1)

    const dateList = computed(() => {
      return Array(daysInMonth.value).fill(0).map((item, index) => index + 1)
    })

    const fullDate = computed(() => {
      return new Date(dayjs().year(year.value).month(month.value - 1).date(date.value).valueOf())
    })

    const onOk = () => {
      emit('update:date', fullDate.value)
      emit('ok', fullDate.value)
    }

    const onCancel = () => {
      emit('cancel', fullDate.value)
    }
    return {
      onOk,
      onCancel,
      dateStr,
      showYear,
      showMonth,
      showDate,
      year,
      month,
      date,
      yearList,
      monthList,
      dateList
    }
  }

})
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

$list-item-height: 30px;

.datepicker {
  .date-picker-header {
    padding: 6px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    > button {
      font-size: 16px;
      border: none;
      outline: none;
      background: transparent;
    }

    .cancel-btn {
      color: $grey-5;
    }

    .ok-btn {
      color: $brand-color;
    }
  }

  .picker-container {
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    > * {
      flex: 1;
    }
  }
}
</style>
