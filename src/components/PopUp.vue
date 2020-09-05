<template>
  <overlay
      animation="fade"
      :duration="duration"
      :show="show"
      @click="$emit('update:show', false)"
  >
    <transition :name="animateName" :duration="duration" appear>
      <div
          :style="{height: height}"
          :class="popupClass"
          v-show="show"
          @click.stop
      >
        <slot/>
      </div>
    </transition>
  </overlay>
</template>

<script lang="ts">
type PopupPosition = 'top' | 'left' | 'right' | 'bottom' | 'center';
import {defineComponent, PropType, computed} from 'vue'
import Overlay from './Overlay.vue'

export default defineComponent(
    {
      name: 'PopUp',
      components: {
        Overlay
      },
      props: {
        show: {
          required: true,
          type: Boolean,
        },
        position: {
          default: 'center',
          type: String as PropType<PopupPosition>
        },
        duration: {
          default: 300,
          type: Number
        },
        height: {
          type: String
        }
      },
      setup(props) {
        const popupClass = computed(() => {
          return {
            'popup': true,
            [props.position]: props.position
          }
        })
        const animateName = computed(() => {
          if (props.position !== 'center') {
            return `slide-from-${props.position}`
          } else {
            return 'fade'
          }
        })
        return {
          popupClass,
          animateName
        }
      }
    }
)
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  background-color: #fff;
}

.top {
  top: 0;
  left: 0;
  width: 100%;
}

.left {
  top: 0;
  left: 0;
  height: 100%;
}

.right {
  top: 0;
  right: 0;
  height: 100%;
}

.bottom {
  width: 100%;
  bottom: 0;
  left: 0;
}

.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>
