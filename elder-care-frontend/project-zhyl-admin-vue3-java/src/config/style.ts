export default {
  showApiModal: false, // 是否展示接口测试工具
  showSidebar: true, // 是否显示侧边栏
  isSidebarCompact: false, // 侧边栏是否展开（这里设置没有用，在SideNav组件中再onMounted中会自动将该值设置为false，也就是默认展开侧边栏）
  showBreadcrumb: true, // 是否展示面包屑
  mode: 'light', // 主题模式 light  black
  brandTheme: 'default', // 主题色配置(mode1/mode2/mode3/mode4/mode5)
  layout: 'top', // 整体布局 'side'左右；"top" 上左右；
  style: 'topMany', // 侧边栏菜单风格(noSecondMenu无二级导航菜单风格、normal正常风格、topMany(仅配合top使用))
  isHeaderFixed: true, // 头部是否固定(只针对top上左右生效，且如果修改为false需要配合top.less里的样式注释配合使用)
  isUseTabsRouter: false, // 是否使用多标签页功能（tab标签方式记录）
  showHeader: true // 是否展示头部（只针对top上下左右的布局生效）
}
