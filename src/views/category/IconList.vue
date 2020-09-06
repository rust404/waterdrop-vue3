<template>
  <ul class="category-icon-list">
    <li v-for="name in iconList" :key="name" @click="$emit('update:icon', name)">
        <span :class="getIconWrapperClass(name)">
          <category-icon class="category-icon" :name="name" size="24px"/>
        </span>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CategoryIcon, {iconList} from "/@/views/common/CategoryIcon.vue";

export default defineComponent({
  name: 'IconList',
  components: {
    CategoryIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  emits: ['update:icon'],
  setup(props) {
    const getIconWrapperClass = (iconName: string) => {
      return {
        'category-icon-wrapper': true,
        'is-active': props.icon === iconName
      }
    }
    return {
      iconList,
      getIconWrapperClass
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.category-icon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .category-icon-wrapper {
    margin: 10px 10px;
  }
  > li {
    width: 20%;
  }
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: $grey-2;
  &.is-active {
    background-color: $brand-color;
    .category-icon {
      color: #fff;
    }
  }
}
</style>
