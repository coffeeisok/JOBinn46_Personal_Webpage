/**
 * =====================================================
 * 主入口文件（main.js）
 * =====================================================
 * 页面加载完成后统一初始化各个交互模块
 * 
 * 模块列表：
 * - 平滑滚动（scroll.js）
 * - 导航高亮与滚动样式（nav.js）
 * - 成员卡片交互（card.js）
 * - 滚动显隐动画（observer.js）
 * - 表单验证（validation.js）【新增】
 * - 回到顶部（validation.js）【新增 jQuery 实现】
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", function() {
  // ==================== 初始化各交互模块 ====================
  
  // 平滑滚动初始化
  if (window.initSmoothScroll) {
    window.initSmoothScroll();
    console.log('✓ 平滑滚动模块已初始化');
  }
  
  // 导航高亮与滚动样式初始化
  if (window.initNavActive) {
    window.initNavActive();
    console.log('✓ 导航模块已初始化');
  }
  
  // 成员卡片交互初始化
  if (window.initCardInteraction) {
    window.initCardInteraction();
    console.log('✓ 成员卡片交互模块已初始化');
  }
  
  // 滚动显隐动画初始化
  if (window.initRevealOnScroll) {
    window.initRevealOnScroll();
    console.log('✓ 滚动动画模块已初始化');
  }
  
  // ==================== jQuery 模块初始化（考核要求）====================
  
  // 表单验证模块初始化（使用 jQuery 实现）
  if (window.initFormValidation) {
    window.initFormValidation();
    console.log('✓ jQuery 表单验证模块已初始化');
  }
  
  // 回到顶部功能初始化（使用 jQuery 实现）
  if (window.initBackToTop) {
    window.initBackToTop();
    console.log('✓ jQuery 回到顶部模块已初始化');
  }
  
  // ==================== 页面加载动画关闭 ====================
  
  // 首屏核心内容可用后，短延时关闭加载动画
  var loader = document.querySelector("#page-loader");
  if (loader) {
    window.setTimeout(function() {
      loader.classList.add("page-loader--hidden");
      console.log('✓ 页面加载动画已关闭');
    }, 220);
  }
  
  // ==================== 初始化完成日志 ====================
  console.log('========================================');
  console.log('易衡咨询（EpochX）官网 - 所有模块初始化完成');
  console.log('jQuery 版本: ' + (typeof jQuery !== 'undefined' ? jQuery.fn.jquery : '未加载'));
  console.log('========================================');
});
