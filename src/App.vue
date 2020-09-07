<template>
  <div id="app">
    <router-view v-slot="{ Component }" class="router-view">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <pop-up v-model:show="showQrcode">
      <img src="./assets/qrcode.png"/>
      <div style="text-align: center">为了保证最好的用户体验<br/>建议扫描二维码在手机上查看</div>
    </pop-up>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import PopUp from "/@/components/PopUp.vue";

export default defineComponent({
  name: 'App',
  components: {
    PopUp
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const transitionName = ref('')
    const pathHistories: string[] = []
    const showQrcode = ref(false)
    store.dispatch('category/load')
    store.dispatch('record/load')

    if (document.documentElement.clientWidth > 500) {
      showQrcode.value = true
    }
    router.beforeEach((to, from, next) => {
      function isNavigateBetweenBottomBar(path1: string, path2: string) {
        const arr = ['/record/add', '/statistics', '/record/detail']
        return arr.indexOf(path1) >= 0 && arr.indexOf(path2) >= 0
      }

      const len = pathHistories.length
      const lastPath = len - 2 >= 0 ? pathHistories[len - 2] : ''
      if (isNavigateBetweenBottomBar(to.path, from.path) || !pathHistories.length) {
        transitionName.value = ''
        pathHistories.push(to.path)
      } else if (lastPath === to.path) {
        transitionName.value = 'router-slide-from-left'
        pathHistories.pop()
      } else {
        transitionName.value = 'router-slide-from-right'
        pathHistories.push(to.path)
      }
      next()
    })
    return {
      transitionName,
      showQrcode
    }
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
