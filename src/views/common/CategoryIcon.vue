<template>
  <component :is="name" :size="size"></component>
</template>

<script lang="ts">
import Utensils from '@wing-ui/icons-vue3/lib/Utensils'
import SuitcaseRolling from '@wing-ui/icons-vue3/lib/SuitcaseRolling'
import DollarSign from '@wing-ui/icons-vue3/lib/DollarSign'
import Book from '@wing-ui/icons-vue3/lib/Book'
import Bus from '@wing-ui/icons-vue3/lib/Bus'
import MobileAlt from '@wing-ui/icons-vue3/lib/MobileAlt'
import HandHoldingUsd from '@wing-ui/icons-vue3/lib/HandHoldingUsd'
import '@wing-ui/icons-vue3/lib/icon.css'
import {defineComponent} from 'vue'

export const iconList = ['utensils', 'suitcase-rolling', 'dollar-sign', 'book', 'bus', 'mobile-alt', 'hand-holding-usd']

export default defineComponent({
  name: 'CategoryIcon',
  components: {
    Utensils,
    SuitcaseRolling,
    DollarSign,
    Book,
    Bus,
    MobileAlt,
    HandHoldingUsd
  },
  props: {
    name: String,
    size: String
  }
})
</script>
