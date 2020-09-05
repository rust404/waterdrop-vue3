import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import Message from './components/Message'

const app = createApp(App)
app.use(router)
app.use(Message)

app.mount('#app')
