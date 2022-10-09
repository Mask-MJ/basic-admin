import { createAsyncComponent } from '/@/utils/createAsyncComponent';
import FullScreen from './FullScreen.vue';

export const UserDropDown = createAsyncComponent(() => import('./dropdown.vue'));

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'));

export const Notify = createAsyncComponent(() => import('./notify/index.vue'));

export { FullScreen };
