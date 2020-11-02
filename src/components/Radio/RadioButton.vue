<template>
  <label :class="radioButtonClassName">
    <input
        class="radio-button-input"
        type="radio"
        :value="label"
        v-model="curValue"
    >
    <span class="radio-button-text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {defineComponent, computed, getCurrentInstance} from 'vue'

export default defineComponent({
  props: {
    label: String
  },
  setup(props, {emit}) {
    const instance = getCurrentInstance()
    const _radioGroup = computed(() => {
      // TODO
      return instance && instance.parent as any
    })
    const curValue = computed({
      get: () => {
        return _radioGroup.value.props.value
      },
      set: () => {
        _radioGroup.value.emit('update:value', props.label)
      }
    })
    const radioButtonClassName = computed(() => {
      return {
        'radio-button': true,
        'is-active': props.label === curValue.value,
        'is-block': _radioGroup.value.block
      }
    })
    return {
      curValue,
      radioButtonClassName
    }
  }
})
</script>

<style lang="scss">
@import '../../style/variable.scss';

.radio-button {
  display: inline-block;
  padding: 5px 15px;
  line-height: 16px;
  text-align: center;
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
