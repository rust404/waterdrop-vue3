<template>
  <ul class="category-list">
    <li
      :class="listItemClassName(category)"
      v-for="category in listData"
      :key="category.id"
      @click="handleClick(category.id)"
    >
      <div class="category-icon-wrapper">
      </div>
      {{category.name}}
    </li>
    <li
        v-if="type === 'manage'"
        @click="handleManage"
        class="category-list-item is-active"
    >
      <div class="category-icon-wrapper">
        <cog class="category-icon" size="30px"/>
      </div>
      管理
    </li>
    <li
        v-if="type === 'add'"
        @click="handleAdd"
        class="category-list-item"
    >
      <div class="category-icon-wrapper">
      </div>
      添加
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import Cog from '@wing-ui/icons-vue3/lib/Cog'
import Plus from '@wing-ui/icons-vue3/lib/Plus'

export default defineComponent({
  components: {
    Cog,
    Plus
  },
  props: {
    selectedCategoryId: Number,
    listData: Array as PropType<Category[]>,
    type: String as PropType<'manage' | 'add'>
  },
  emits: ['update:selectedCategoryId', 'manage'],
  setup(props, {emit}) {
    return {
      listItemClassName(category: Category) {
        return  {
          'category-list-item': true,
          'is-active': props.selectedCategoryId === category.id
        }
      },
      handleClick(id: number) {
        emit('change', id)
      },
      handleManage() {
        emit('manage')
      },
      handleAdd() {
        emit('add')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../style/variable';
$gap: 20px;
.category-list {
  display: flex;
  flex-wrap: wrap;
  padding: $gap / 2;
  align-items: flex-start;
  &-item {
    width: 20%;
    margin: $gap / 2 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .category-icon-wrapper {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: $grey-2;
      margin-bottom: 6px;
    }
    &.is-active .category-icon-wrapper {
      background-color: $brand-color;
      .category-icon {
        color: $grey-2;
      }
    }
  }
}
</style>
