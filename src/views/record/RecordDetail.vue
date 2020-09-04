<template>
  <layout>
    record detail
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
  </layout>
</template>

<script lang="ts">
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue'
export default {
  name: 'RecordDetail',
  components: {
    Layout,
    NavBar
  }
}
</script>
