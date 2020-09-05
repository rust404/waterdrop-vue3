<template>
  <label :class="radioButtonClassName">
    <input
        class="radio-button-input"
        type="radio"
        :value="label"
        v-model="value"
    >
    <span class="radio-button-text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import RadioGroup from './RadioGroup.vue';

export default defineComponent({
  props: {
    label: String
  },
  computed: {
    _radioGroup() {
      // TODO
      return this.$parent as RadioGroup
    },
    radioButtonClassName() {
      return {
        'radio-button': true,
        'is-active': this.label === this.value
      }
    },
    value: {
      get() {
        return this._radioGroup.value
      },
      set() {
        this._radioGroup.$emit('update:value', this.label)
      }
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.radio-button {
  display: inline-block;
  padding: 5px 15px;
  line-height: 16px;
  border: 1px solid $brand-color;
  color: $brand-color;

  .radio-button-input {
    display: none;
  }

  .radio-button-text {
    font-size: 14px;
  }

  &.is-active {
    color: #fff;
    background: $brand-color;
  }
}

</style>
