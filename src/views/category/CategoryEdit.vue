<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <template v-slot:right>
          <button class="finished-btn" @click="handleFinished">完成</button>
        </template>
        编辑分类
      </top-bar>
    </template>
    <category-info :icon="categoryIcon" v-model:name="categoryName"/>
    <icon-list v-model:icon="categoryIcon"/>
  </layout>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import Layout from "/@/components/Layout.vue";
import TopBar from "/@/components/TopBar.vue";
import IconList from "/@/views/category/IconList.vue";
import CategoryInfo from "/@/views/category/CategoryInfo.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {getCategoryById} from "/@/store/utils";
import {message} from "/@/components/Message";

export default defineComponent({
  name: 'CategoryEdit',
  components: {
    CategoryInfo,
    IconList,
    Layout,
    TopBar,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const categoryList = computed(() => {
      return store.state.category.categoryList as Category[]
    })
    const category = getCategoryById(categoryList.value, Number(route.params.id))
    if (!category) return
    const categoryName = ref(category.name)
    const categoryIcon = ref(category.icon)
    const validate = () => {
      if (categoryName.value.length === 0) {
        message.warning('分类名称不能为空')
        return false
      }
      if (categoryName.value.length > 6) {
        message.warning('分类名称不能长于6个字')
        return false
      }
      if (categoryIcon.value === '') {
        message.warning('请选择分类图标')
        return false
      }
      return true
    }
    const handleFinished = () => {
      if (!validate()) return
      store.dispatch('category/edit', {
        id: Number(route.params.id),
        icon: categoryIcon.value,
        name: categoryName.value
      })
      message.success('编辑分类成功')
      router.back()
    }
    return {
      categoryName,
      categoryIcon,
      handleFinished
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.finished-btn {
  color: $brand-color;
}
</style>
