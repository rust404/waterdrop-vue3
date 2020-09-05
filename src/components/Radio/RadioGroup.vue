<template>
  <div class="radio-input">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    value: String
  }
})
</script>

<style lang="scss" scoped>
.radio-input {
  :nth-child(n+2) {
    margin-left: -1px;
  }
}
</style>
