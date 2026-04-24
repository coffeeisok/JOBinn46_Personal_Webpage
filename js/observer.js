function initRevealOnScroll() {
  // 滚动显隐：元素首次进入视口时添加可见态，并取消后续观察。
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// 暴露到 window，供 main.js 统一初始化。
window.initRevealOnScroll = initRevealOnScroll;
