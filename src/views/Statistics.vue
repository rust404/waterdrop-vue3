<template>
  <layout>
    statistics
    <template v-slot:footer>
      <nav-bar></nav-bar>
    </template>
  </layout>
</template>

<script lang="ts">
import Layout from '/@/components/Layout.vue'
import NavBar from '/@/components/NavBar.vue'
export default {
  name: 'Statistics',
  components: {
    Layout,
    NavBar
  }
}
</script>
