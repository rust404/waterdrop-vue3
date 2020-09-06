<template>
  <layout>
    <template v-slot:header>
      <top-bar>
        <radio-group v-model:value="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
      </top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
    <div class="category-list-wrapper">
      <category-list type="manage" v-model="selectedId" :listData="selectedCategoryList" @manage="onManageClick"/>
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <number-pad v-model:date="curDate" v-model:calcStr="calcStr" @submit="handleSubmit"/>
    </div>
  </layout>
</template>

<script lang="ts">
import {ref, defineComponent, computed} from 'vue'
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue'
import TopBar from '/@/components/TopBar.vue'
import PopUp from '/@/components/PopUp.vue'
import RadioGroup from '/@/components/Radio/RadioGroup.vue'
import RadioButton from '/@/components/Radio/RadioButton.vue'
import CalcStrBar from './common/CalcStrBar.vue'
import NumberPad from "./common/NumberPad.vue";
import CategoryList from "./common/CategoryList.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'RecordAdd',
  components: {
    Layout,
    NavBar,
    TopBar,
    PopUp,
    RadioButton,
    RadioGroup,
    CalcStrBar,
    NumberPad,
    CategoryList
  },
  methods: {
    handleSubmit() {
      console.log('submit')
    }
  },
  setup() {
    const store = useStore()
    store.dispatch('category/load')

    const moneyType  = ref<MoneyType>('expenditure')
    const selectedId = ref<number>(-1)
    const calcStr = ref<string>('0')
    const curDate = ref<Date>(new Date())
    const onManageClick = () => {}
    const selectedCategoryList = computed<Category[]>(() => store.state.category.categoryList)

    return {
      moneyType,
      selectedId,
      calcStr,
      curDate,
      onManageClick,
      selectedCategoryList,
    }
  }
})
</script>

<style lang="scss" scoped>
.category-list-wrapper {
  flex: 1;
  overflow: auto;
}
.control-panel {
  flex-shrink: 0;
}
</style>
