import { ContentEnum } from '/@/store/enum/appEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '/@/store/enum/menuEnum';

export interface ProjectConfig {
  // content width
  contentMode: ContentEnum;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Show breadcrumbs
  showBreadCrumb: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
}

// 头部导航栏设置
export interface HeaderSetting {
  fixed: boolean;
  show: boolean;
  // Turn on full screen
  showFullScreen: boolean;
  // Show message center button
  showNotice: boolean;
  showSearch: boolean;
}

// 多 tabs 页设置
export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}
// 菜单栏设置
export interface MenuSetting {
  fixed: boolean;
  collapsed: boolean;
  siderHidden: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

// 动画设置
export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}
