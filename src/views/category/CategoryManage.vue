<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <radio-group v-model:value="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <category-list type="add" :listData="selectedCategoryList" @update:selected-id="onItemClick" @add="onAddClick"/>
  </layout>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import Layout from "/@/components/Layout.vue";
import TopBar from "/@/components/TopBar.vue";
import RadioGroup from "/@/components/Radio/RadioGroup.vue";
import RadioButton from "/@/components/Radio/RadioButton.vue";
import CategoryList from "/@/views/record/common/CategoryList.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {getCategories} from "/@/store/utils";

export default defineComponent({
  name: 'CategoryManage',
  components: {
    Layout,
    TopBar,
    RadioGroup,
    RadioButton,
    CategoryList,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    store.dispatch('category/load')

    const moneyType = ref<MoneyType>('expenditure')
    const selectedCategoryList = computed(() => {
      return getCategories(store.state.category.categoryList,{moneyType: moneyType.value})
    })
    const onItemClick = (id: number) => {
      router.push(`/category/edit/${id}`)
    }
    const onAddClick = () => {
      router.push(`/category/add/${moneyType.value}`)
    }
    return {
      moneyType,
      selectedCategoryList,
      onItemClick,
      onAddClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.back-btn {
  color: $grey-5;
  .back-icon {
    fill: $grey-5;
  }
}
</style>
