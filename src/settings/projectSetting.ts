import type { ProjectConfig } from '/#/config';
import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@/store/enum/menuEnum';
import { ContentEnum } from '/@/store/enum/appEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // content mode
  contentMode: ContentEnum.FULL,

  // Header configuration
  headerSetting: {
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
  },

  // Menu configuration
  menuSetting: {
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // When sider hide because of the responsive layout
    siderHidden: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.HEADER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to open back to top
  useOpenBackTop: true,
};

export default setting;
