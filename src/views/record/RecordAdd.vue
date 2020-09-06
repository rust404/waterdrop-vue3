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
      <category-list type="manage" v-model:selectedId="selectedId" :listData="selectedCategoryList" @manage="onManageClick"/>
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
import {message} from "/@/components/Message"
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
  setup() {
    const store = useStore()
    store.dispatch('category/load')

    const moneyType  = ref<MoneyType>('expenditure')
    const selectedId = ref<number>(-1)
    const calcStr = ref<string>('0')
    const curDate = ref<Date>(new Date())
    const onManageClick = () => {}
    const selectedCategoryList = computed<Category[]>(() => store.state.category.categoryList)

    const validate = () => {
      if (selectedId.value === -1) {
        message.warning('分类不能为空')
        return false
      } else if (calcStr.value === '0') {
        message.warning('数值不能为0')
        return false
      } else if (parseFloat(calcStr.value) < 0) {
        message.warning('数值不能为负')
        return false
      }
      return true
    }
    const handleSubmit = () => {
      if (!validate()) {
        return
      }
      store.dispatch('record/add', {
        categoryId: selectedId.value,
        moneyType: moneyType.value,
        amount: +calcStr.value,
        createAt: curDate.value.toISOString()
      } as Omit<MoneyRecord, "id">)
      message.success('记录添加成功')
    }

    return {
      moneyType,
      selectedId,
      calcStr,
      curDate,
      onManageClick,
      selectedCategoryList,
      handleSubmit
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
