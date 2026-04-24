function initSmoothScroll() {
  // 监听所有锚点链接，统一处理平滑滚动行为。
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      // Logo 返回顶部单独使用 window.scrollTo，避免 sticky header 锚点失效。
      if (targetId === "#top") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // 其他锚点使用 scrollIntoView 对齐对应 section。
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// 暴露到 window，供 main.js 统一初始化。
window.initSmoothScroll = initSmoothScroll;
