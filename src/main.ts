import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store';
import { setupRouter, router } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';

const app = createApp(App);
// 配置 store
setupStore(app);
// 配置路由
setupRouter(app);
// 路由守卫
setupRouterGuard(router);
app.mount('#app');
