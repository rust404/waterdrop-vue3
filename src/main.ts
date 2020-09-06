import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import Message from './components/Message'

const app = createApp(App)

app.use(Message)
app.use(router)
app.use(store)

app.mount('#app')
