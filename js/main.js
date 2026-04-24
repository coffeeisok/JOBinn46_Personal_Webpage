document.addEventListener("DOMContentLoaded", () => {
  // 页面入口：统一初始化各交互模块。
  if (window.initSmoothScroll) window.initSmoothScroll();
  if (window.initNavActive) window.initNavActive();
  if (window.initCardInteraction) window.initCardInteraction();
  if (window.initRevealOnScroll) window.initRevealOnScroll();

  // 首屏核心内容可用后，短延时关闭加载动画。
  const loader = document.querySelector("#page-loader");
  if (loader) {
    window.setTimeout(() => {
      loader.classList.add("page-loader--hidden");
    }, 220);
  }
});
