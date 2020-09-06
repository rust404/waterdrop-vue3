<template>
  <layout>
    <template v-slot:header>
      <top-bar show-back>
        <radio-group v-model:value="moneyType">
          <radio-button label="expenditure">支出</radio-button>
          <radio-button label="income">收入</radio-button>
        </radio-group>
        <template v-slot:right>
          <button class="delete-btn" @click="handleDelete">删除</button>
        </template>
      </top-bar>
    </template>
    <div class="category-list-wrapper">
      <category-list type="manage" v-model:selectedId="selectedId" :listData="selectedCategoryList"
                     @manage="onManageClick"/>
    </div>
    <div class="control-panel">
      <calc-str-bar :calcStr="calcStr"/>
      <number-pad v-model:date="curDate" v-model:calcStr="calcStr" @submit="handleSubmit"/>
    </div>
  </layout>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import Layout from "/@/components/Layout.vue";
import NavBar from "/@/components/NavBar.vue";
import TopBar from "/@/components/TopBar.vue";
import RadioButton from "/@/components/Radio/RadioButton.vue";
import RadioGroup from "/@/components/Radio/RadioGroup.vue";
import CategoryList from "./common/CategoryList.vue";
import NumberPad from "./common/NumberPad.vue";
import CalcStrBar from "./common/CalcStrBar.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {getCategories, getRecords} from "/@/store/utils";
import {message} from "/@/components/Message";

export default defineComponent({
  name: 'RecordEdit',
  components: {
    Layout,
    NavBar,
    TopBar,
    RadioButton,
    RadioGroup,
    CategoryList,
    NumberPad,
    CalcStrBar,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const record = getRecords(store.state.record.recordList,{id: Number(route.params.id)})[0]
    if (!record) {
      router.replace('/')
      return
    }
    const moneyType = ref<MoneyType>(record.moneyType)
    const selectedId = ref(record.categoryId)
    const curDate = ref(new Date(record.createAt))
    const calcStr = ref(record.amount + '')
    const categoryList = computed(() => {
      return store.state.category.categoryList as Category[]
    })
    const recordList = computed(() => {
      return store.state.record.recordList as MoneyRecord[]
    })

    const selectedCategoryList = computed(() => {
      return getCategories(categoryList.value, {
        moneyType: moneyType.value
      })
    })
    const onManageClick = () => {
      router.push('/category/manage')
    }
    const handleDelete = () => {
      store.dispatch('record/delete', parseInt(route.params.id as string))
      message.success('删除成功')
      router.back()
    }
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
      if (!validate()) { return }
      store.dispatch('record/edit', {
        id: parseInt(route.params.id as string),
        moneyType: moneyType.value,
        categoryId: selectedId.value,
        amount: +calcStr.value,
        createAt: curDate.value.toISOString()
      })
      message.success('编辑成功', 1000)
      router.push('/record/detail')
    }
    return {
      handleSubmit,
      moneyType,
      handleDelete,
      selectedId,
      selectedCategoryList,
      onManageClick,
      calcStr,
      curDate,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/variable';

.category-list-wrapper {
  flex: 1;
  overflow: auto;
}

.control-panel {
  flex-shrink: 0;
}

.delete-btn {
  color: $danger;
}
</style>
