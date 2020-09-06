<template>
  <div ref="container" :style="{width: width, height: height}">echarts</div>
</template>

<script lang="ts">
import {defineComponent, ref, toRef, watch, onMounted, PropType} from 'vue'
import {EChartOption, ECharts} from 'echarts'
import * as echarts from 'echarts/echarts.all.js'

type EchartsListeners = {
  [index: string]: Function | Function[];
}

export default defineComponent({
  name: 'VEcharts',
  props: {
    width: {
      default: '100%',
      type: String
    },
    height: {
      default: '300px',
      type: String
    },
    option: {
      required: true,
      type: Object as PropType<EChartOption>
    },
    listeners: {
      type: Object as PropType<EchartsListeners>
    }
  },
  setup(props) {
    const charts = ref<ECharts>()
    const width = toRef(props, 'width')
    const height = toRef(props, 'height')
    const option = toRef(props, 'option')
    const listeners = toRef(props, 'listeners')
    const container = ref<HTMLDivElement | null>(null)
    const bindListeners = (listeners: EchartsListeners) => {
      for (const j in listeners) {
        if (!listeners.hasOwnProperty(j)) continue
        const handler = listeners[j]
        if (Array.isArray(handler)) {
          handler.forEach(fn => {
            charts.value?.on(j, fn)
          })
        } else if (typeof handler === 'function') {
          charts.value?.on(j, handler)
        }
      }
    }
    const unbindListeners = (listeners: EchartsListeners) => {
      if (listeners) {
        for (const i in listeners) {
          if (!listeners.hasOwnProperty(i)) continue
          charts.value?.off(i)
        }
      }
    }
    onMounted(() => {
      if (!container.value) {
        console.error('echarts container is empty, cannot initialize')
        return
      }
      charts.value = echarts.init(container.value)
      charts.value?.setOption(props.option)
      props.listeners && bindListeners(props.listeners)
    })
    watch(option, (value) => {
      charts.value?.setOption(value)
    })
    watch(listeners, (value, oldVal) => {
      if (!charts.value) return
      oldVal && unbindListeners(oldVal)
      value && bindListeners(value)
    })
    return {
      container,
      width,
      height
    }
  }
})
</script>
