<template>
  <label class="category-info">
    <span class="category-icon-wrapper">
      <category-icon class="category-icon" size="24px" :name="icon"/>
    </span>
    <input type="text" class="icon-name" :value="name" @input="$emit('update:name', $event.target.value)"
           placeholder="分类名称">
  </label>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CategoryIcon from "/@/views/common/CategoryIcon.vue";

export default defineComponent({
  name: 'CategoryInfo',
  components: {
    CategoryIcon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  emits: ['update:name']
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: $brand-color;

  .category-icon {
    color: #fff;
  }
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;

  .icon-name {
    width: 0;
    flex: 1;
    border: none;
    outline: none;
    text-align: right;
    line-height: 24px;
    font-size: 20px;
  }
}
</style>
