import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store';
import { setupRouter, router } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { initAppConfigStore } from './logics/initAppConfig';
import { setupGlobDirectives } from '/@/directives';

const app = createApp(App);
// 配置 store
setupStore(app);
// 初始化内部系统配置
initAppConfigStore();
// 配置路由
setupRouter(app);
// 路由守卫
setupRouterGuard(router);
// 注册全局指令
setupGlobDirectives(app);
app.mount('#app');
