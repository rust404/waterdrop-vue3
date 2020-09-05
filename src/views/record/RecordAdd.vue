<template>
  <layout>
    {{123}}
    {{moneyType}}
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
  </layout>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue'
import TopBar from '/@/components/TopBar.vue'
import PopUp from '/@/components/PopUp.vue'
import RadioGroup from '/@/components/Radio/RadioGroup.vue'
import RadioButton from '/@/components/Radio/RadioButton.vue'

export default defineComponent({
  name: 'RecordAdd',
  components: {
    Layout,
    NavBar,
    TopBar,
    PopUp,
    RadioButton,
    RadioGroup,
  },
  methods: {
  },
  setup() {
    const moneyType  = ref<MoneyType>('expenditure')
    const selectedId = ref<number>(-1)
    const calcStr = ref<string>('0')
    const curDate = ref<Date>(new Date())
    return {
      moneyType,
      selectedId,
      calcStr,
      curDate
    }
  }
})
</script>
