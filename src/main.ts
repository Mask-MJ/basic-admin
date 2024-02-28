import 'uno.css'
import './assets/styles/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupStore } from './store'
import { setupI18n } from './locales'
import { setupRouter } from './router'

const app = createApp(App)

// 配置 store
setupStore(app)
// 多语言
setupI18n(app)
// 配置路由
setupRouter(app)

app.mount('#app')
