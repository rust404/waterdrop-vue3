<template>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from "vuex";
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    store.dispatch('category/load')
    store.dispatch('record/load')
  }
})
</script>
<style lang="scss">

@import "./style/reset.scss";
@import "./style/animation.scss";

body {
  max-width: 500px;
  margin: 0 auto;
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
