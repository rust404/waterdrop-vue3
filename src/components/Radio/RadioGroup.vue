<template>
  <div class="radio-input" :class="groupClass">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    value: String,
    block: Boolean
  },
  computed: {
    groupClass() {
      return {
        'is-block': this.block
      }
    }
  }
})
</script>

<style lang="scss">
.radio-input {
  flex-shrink: 0;
  :nth-child(n+2) {
    margin-left: -1px;
  }
  &.is-block {
    display: flex;
    > * {
      flex: 1;
    }
  }
}
</style>
