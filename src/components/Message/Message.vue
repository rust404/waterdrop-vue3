<template>
    <div class="message-wrapper">
      <transition-group
          @enter="enter"
          @leave="leave"
          :duration="animateDuration"
      >
        <div
            class="message-item"
            :class="messageClass(m.type)"
            v-for="m in messages"
            :key="m.id"
        >
          <div class="message-item-content">
            {{ m.message }}
          </div>
        </div>
      </transition-group>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {MessageItem, MessageType, MessageOption} from './message-types';

// vue3无法直接获取到组件实例及其实例方法，只能曲线救国
export let API: { addMessage: (options: MessageOption) => void }

export default defineComponent({
  data() {
    return {
      messages: [] as MessageItem[],
      animateDuration: 200
    }
  },
  created() {
    API = {
      addMessage: this.addMessage
    }
  },
  methods: {
    messageClass(type: MessageType) {
      return {
        [type]: type
      }
    },
    enter(el: HTMLElement) {
      const height = el.getBoundingClientRect().height
      el.style.height = '0px'
      el.style.transition = `height ${this.animateDuration}ms`
      setTimeout(() => {
        el.style.height = height + 'px'
      }, 0)
    },
    leave(el: HTMLElement) {
      el.style.height = '0px'
    },
    addMessage({type, message, duration = 2000}: MessageOption) {
      const item: MessageItem = {
        type,
        message,
        id: +new Date()
      }
      this.messages.push(item)
      setTimeout(() => {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === item.id) {
            this.messages.splice(i, 1)
          }
        }
      }, duration)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.message-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.message-item {
  text-align: center;
  overflow: hidden;
}

.message-item-content {
  padding: 6px 0;
}

@each $type, $color in $theme {
  .#{$type} {
    color: #fff;
    background-color: $color;
  }
}
</style>
