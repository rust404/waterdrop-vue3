<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <template v-slot:right>
          <button class="finished-btn" @click="handleFinished">完成</button>
        </template>
        添加{{ chnMoneyType }}分类
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
import CategoryInfo from "/@/views/category/CategoryInfo.vue";
import IconList from "/@/views/category/IconList.vue";
import {iconList} from "/@/views/common/CategoryIcon.vue";
import {message} from "/@/components/Message";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

export default  defineComponent({
  name: 'CategoryAdd',
  components: {
    CategoryInfo,
    Layout,
    TopBar,
    IconList,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const categoryName = ref('')
    const categoryIcon = ref(iconList[0])
    const categoryList = computed(() => {
      return store.state.category.categoryList as Category[]
    })
    const chnMoneyType = computed(() => {
      const map = {
        'expenditure': '支出',
        'income': '收入'
      }
      return map[route.params.type as MoneyType]
    })
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
      if (categoryList.value.some(category => category.name === categoryName.value)) {
        message.warning('不能与已有分类名称重复')
        return false
      }
      return true
    }
    const handleFinished = () => {
      if (!validate()) return
      store.dispatch('category/add', {
        icon: categoryIcon.value,
        moneyType: route.params.type as MoneyType,
        name: categoryName.value
      })
      message.success('添加分类成功')
      router.back()
    }
    return {
      handleFinished,
      chnMoneyType,
      categoryIcon,
      categoryName
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
