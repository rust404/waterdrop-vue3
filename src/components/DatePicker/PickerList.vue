<template>
  <div class="picker-list-wrapper">
    <div class="picker-list-wheel">
      <ul class="picker-list" :style="style" @touchstart="onTouchStart" @touchmove="onTouchMove"
          @touchend="onTouchEnd">
        <li class="picker-list-item" v-for="item in listData" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, PropType, onMounted, watchEffect} from 'vue'

type ListItem = string

const LIST_ITEM_HEIGHT = 30

export default defineComponent({
  props: {
    listData: {
      default: [],
      type: Array as PropType<ListItem[]>
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['update:value'],
  setup(props, {emit}) {
    const startY = ref(0)
    const startTop = ref(0)
    const style = reactive({
      top: '0px',
      transition: 'none'
    })
    onMounted(() => {
      let index = -1
      for (let i = 0; i < props.listData.length; i++) {
        if (props.listData[i].toString() === props.value.toString()) {
          index = i
          break
        }
      }
      style.top = -index * LIST_ITEM_HEIGHT + 'px'
    })
    watchEffect(() => {
      const curIndex = -Math.round(parseInt(style.top) / LIST_ITEM_HEIGHT)
      if (curIndex >= props.listData.length) {
        style.top = -(props.listData.length - 1) * LIST_ITEM_HEIGHT + 'px'
      }
    })
    const onTouchStart = (e: TouchEvent) => {
      startY.value = e.touches[0].clientY
      startTop.value = parseInt(style.top)
      style.transition = 'none'
      e.preventDefault()
    }
    const onTouchMove = (e: TouchEvent) => {
      const limitRange = 50
      const maxTop = limitRange
      const minTop = -(props.listData.length - 1) * LIST_ITEM_HEIGHT - limitRange
      let top = startTop.value + e.touches[0].clientY - startY.value
      top = top > maxTop ? maxTop : top
      top = top < minTop ? minTop : top
      style.top = top + 'px'
      e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      let top = parseInt(style.top)
      top > 0 && (top = 0)
      let index = -Math.round(top / LIST_ITEM_HEIGHT)
      index >= props.listData.length && (index = props.listData.length - 1)
      style.top = -index * LIST_ITEM_HEIGHT + 'px'
      style.transition = 'top 200ms ease-in'
      emit('update:value', props.listData[index])
      e.preventDefault()
    }
    return {
      style,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }
  }


})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

$list-item-height: 30px;
.picker-list-wrapper {
  position: relative;
  margin: 0 6px;
  display: flex;
  align-items: center;
  height: $list-item-height * 5;

  .picker-list-wheel {
    position: relative;
    width: 100%;
    height: $list-item-height;
    border-top: 1px solid $brand-color;
    border-bottom: 1px solid $brand-color;

    .picker-list {
      position: absolute;
      top: -30px;
      left: 0;
      width: 100%;

      .picker-list-item {
        font-size: 20px;
        text-align: center;
        line-height: $list-item-height;
        height: $list-item-height;
      }
    }
  }
}
</style>
