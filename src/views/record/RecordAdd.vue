<template>
  <layout>
    record add
    <template v-slot:header>
      <top-bar>123</top-bar>
    </template>
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
  </layout>
</template>

<script>
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue';
import TopBar from '/@/components/TopBar.vue'

export default {
  name: 'RecordAdd',
  components: {
    Layout,
    NavBar,
    TopBar,
  }
}
</script>
