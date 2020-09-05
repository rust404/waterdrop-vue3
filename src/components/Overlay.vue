<template>
  <teleport :to="container">
    <transition
        :name="animation"
        appear
        :duration="duration"
    >
      <div class="overlay" v-show="show" @click="onClick">
        <slot/>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent(
    {
      name: 'Overlay',
      emits: ['click'],
      props: {
        show: {
          default: false,
          type: Boolean
        },
        duration: {
          default: 0,
          type: Number
        },
        container: {
          default: 'body',
          type: String
        },
        animation: {
          type: String,
          default: 'fade'
        }
      },
      setup(props, {emit}) {
        const onClick = (e: Event) => {
          emit('click', e)
        }
        return {
          onClick
        }
      }
    }
)
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  transform: translateZ(0);
}
</style>
