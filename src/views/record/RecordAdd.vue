<template>
  <layout>
    record add
    <div @click="onClick">show message</div>
    <template v-slot:header>
      <top-bar>123</top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
  </layout>
</template>

<script>
import {ref, defineComponent, onMounted} from 'vue'
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue'
import TopBar from '/@/components/TopBar.vue'
import PopUp from '/@/components/PopUp.vue'

export default defineComponent({
  name: 'RecordAdd',
  components: {
    Layout,
    NavBar,
    TopBar,
    PopUp
  },
  methods: {
    onClick() {
      this.$message.warning('hello')
    }
  },
  setup() {
    const show = ref(false)
    return {
      show
    }
  }
})
</script>
