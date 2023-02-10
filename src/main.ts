import { createApp } from 'vue'
import '@/styles/index.css'
import App from '@/App.vue'
// 引入路由
import { router } from '@/router/index'
// 引入pinia
import pinia from '@/store/index'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
