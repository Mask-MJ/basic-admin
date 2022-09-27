import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '/@/router';

const app = createApp(App);
// 配置路由
setupRouter(app);
app.mount('#app');
