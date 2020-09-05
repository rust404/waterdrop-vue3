<template>
  <nav class="nav-bar">
    <router-link class="nav-bar-item" to="/record/detail">
      <file-alt-regular class="nav-bar-icon"/>
      明细
    </router-link>
    <router-link class="nav-bar-item" to="/record/add">
      <plus-circle class="nav-bar-icon"/>
      记一笔
    </router-link>
    <router-link class="nav-bar-item" to="/statistics">
      <chart-line class="nav-bar-icon"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
import FileAltRegular from '@wing-ui/icons-vue3/lib/FileAltRegular'
import PlusCircle from '@wing-ui/icons-vue3/lib/PlusCircle'
import ChartLine from '@wing-ui/icons-vue3/lib/ChartLine'
import '@wing-ui/icons-vue3/lib/icon.css'

export default {
  name: 'NavBar',
  components: {
    FileAltRegular,
    PlusCircle,
    ChartLine
  }
}
</script>

<style lang="scss" scoped>
//
@import "../style/variable";
.nav-bar {
  display: flex;
  box-shadow: 0 -2px 8px #e0e0e0;
  > .nav-bar-item {
    flex: 1 0 0;
    line-height: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-bar-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }
    &.router-link-exact-active {
      color: $brand-color;
      .nav-bar-icon {
        fill: $brand-color;
      }
    }
  }
}
</style>
