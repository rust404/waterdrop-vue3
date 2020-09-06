<template>
  <div class="number-pad" @click="onClick">
    <button class="calc-button" data-type="1">1</button>
    <button class="calc-button" data-type="2">2</button>
    <button class="calc-button" data-type="3">3</button>
    <button @click="showDatePicker = true" class="date-picker-button" data-type="date">{{ dateStr }}</button>
    <button class="calc-button" data-type="4">4</button>
    <button class="calc-button" data-type="5">5</button>
    <button class="calc-button" data-type="6">6</button>
    <button class="calc-button" data-type="+">+</button>
    <button class="calc-button" data-type="7">7</button>
    <button class="calc-button" data-type="8">8</button>
    <button class="calc-button" data-type="9">9</button>
    <button class="calc-button" data-type="-">-</button>
    <button class="calc-button" data-type=".">.</button>
    <button class="calc-button" data-type="0">0</button>
    <button class="clear-button" data-type="clear">back</button>
    <button v-if="!showEqual" class="submit-button" data-type="submit">完成</button>
    <button v-if="showEqual" class="equal-button" data-type="getResult">=</button>
    <pop-up v-model:show="showDatePicker" position="bottom">
      <DatePicker v-model:date="curDate" @ok="showDatePicker = false"/>
    </pop-up>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch} from 'vue'
import Backspace from '@wing-ui/icons-vue3/lib/Backspace'
import dayjs from "dayjs";
import useCalc from "./useCalc";
import PopUp from '/@/components/PopUp.vue'
import Overlay from '/@/components/Overlay.vue'
import DatePicker from '/@/components/DatePicker/DatePicker.vue'

export type Operator = '+' | '-'
export type NumberStr = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type NumberPadHandlerVal = Operator | NumberStr | 'submit' | 'date' | 'clear' | '.' | 'getResult'

export default defineComponent({
  components: {
    PopUp,
    DatePicker,
    Backspace,
    Overlay
  },
  emits: [
    'submit',
    'update:calcStr',
    'update:date'
  ],
  props: {
    date: {
      type: Date,
      required: true
    },
    calcStr: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}) {
    const {calcStr, getCalcResult, clear, addChar} = useCalc(props.calcStr)
    const curDate = ref(props.date || new Date())
    const showDatePicker = ref<boolean>(false)
    const dateStr = computed(() => {
      return dayjs(curDate.value).format('YYYY/MM/DD')
    })
    const showEqual = computed(() => {
      return calcStr.value.indexOf('-') !== -1 || calcStr.value.indexOf('+') !== -1
    })
    const onClick = (e: MouseEvent) => {
      const container = e.currentTarget as HTMLDivElement
      let target = e.target as HTMLElement
      while (container.contains(target) && !target.dataset.type) {
        target = target.parentNode as HTMLElement
      }
      const btnType = target.dataset.type as NumberPadHandlerVal
      if (container === target) return
      switch (btnType) {
        case '+':
        case '-':
          addChar(btnType)
          break
        case 'submit':
          getCalcResult()
          emit('submit')
          break
        case 'clear':
          clear()
          break
        case '.':
          addChar('.')
          break
        case 'getResult':
          getCalcResult()
          break
        case 'date':
          break
        default:
          addChar(btnType)
      }
    }
    watch(calcStr, (value) => {
      emit('update:calcStr', value)
    })
    watch(curDate, (value) => {
      emit('update:date', value)
    })
    return {
      showEqual,
      curDate,
      showDatePicker,
      dateStr,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../style/variable';

$gap: 10px;
.number-pad {
  background: $grey-2;
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;

  > button {
    box-sizing: content-box;
    display: inline-block;
    width: calc((100% - #{$gap * 5}) / 4);
    margin: $gap / 2;
    font-size: 16px;
    line-height: 2;
    background: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    transition: all 100ms ease-in;

    &:focus {
      outline: none;
    }

    &:active {
      color: #fff;
      background-color: $brand-color;
    }

    &.clear-button {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        stroke-width: 0.5
      }
    }

    &.submit-button,
    &.equal-button {
      color: #fff;
      background-color: $brand-color;

      &:active {
        color: #000;
        background: #fff;
      }
    }

    &.date-picker-button {
      font-size: 14px;
    }
  }
}
</style>
