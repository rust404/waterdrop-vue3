import {ref, computed} from 'vue'
import {NumberStr, Operator} from "./NumberPad.vue";

function useCalc(init: string) {
  const left = ref(init)
  const right = ref('')
  const operator = ref('')
  const calcStr = computed(() => {
    return left.value + operator.value + right.value
  })
  const getCalcResult = () => {
    let result:number
    if (operator.value === '+') {
      result = +left.value+ +right.value
    } else {
      result = +left.value- +right.value
    }
    // 如果为.00，则说明为整数，可以去除
    left.value = result.toFixed(2).replace(/\.00$/, '')
    right.value = ''
    operator.value = ''
  }
  const clear = () => {
    if (right.value) {
      right.value = right.value.slice(0, -1)
    } else if (operator.value) {
      operator.value = ''
    } else if (left.value.length > 1) {
      left.value = left.value.slice(0, -1)
    } else {
      left.value = '0'
    }
  }
  const handleOperator = (val: Operator) => {
    if (right.value.length !== 0) {
      getCalcResult()
    }
    operator.value = val
  }
  const handleNumber = (val: NumberStr) => {
    const reg = /\.\d{2,}$/
    if (operator.value) {
      if (reg.test(right.value)) return
      if (right.value === '0') {
        right.value= val
      } else {
        right.value+= val
      }
    } else {
      if (reg.test(left.value)) return
      if (left.value=== '0') {
        left.value= val
      } else {
        left.value+= val
      }
    }
  }
  const handleDot = () => {
    if (operator.value) {
      if (right.value.indexOf('.') === -1) {
        if (right.value.length === 0) right.value= '0'
        right.value+= '.'
      }
    } else {
      if (left.value.indexOf('.') === -1) {
        if (left.value.length === 0) right.value= '0'
        left.value+= '.'
      }
    }
  }
  const addChar = (value: NumberStr | Operator | '.') => {
    switch (value) {
      case '+':
      case '-':
        handleOperator(value)
        break
      case '.':
        handleDot()
        break
      default:
        handleNumber(value)
    }
  }
  return {
    calcStr,
    getCalcResult,
    clear,
    addChar
  }
}

export default useCalc
