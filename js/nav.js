function initNavActive() {
  // 导航模块：处理滚动高亮、滚动态头部样式、移动端菜单开关。
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelectorAll(".nav__item");
  const sections = document.querySelectorAll("main section[id]");

  if (!header || !nav) return;

  // 根据 section id 切换导航项激活态。
  const setActiveById = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("nav__item--active", isActive);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveById(entry.target.id);
        }
      });
    },
    { threshold: 0.4 }
  );

  // 监听每个 section，进入视口即更新导航高亮。
  sections.forEach((section) => sectionObserver.observe(section));

  // 监听 Hero，离开首屏后给 header 增加滚动态样式。
  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0.05 }
  );

  const hero = document.querySelector("#hero");
  if (hero) {
    headerObserver.observe(hero);
  }

  // 移动端菜单：点击按钮开关，点击导航项后收起菜单。
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

// 暴露到 window，供 main.js 统一初始化。
window.initNavActive = initNavActive;
