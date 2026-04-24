function initCardInteraction() {
  // 成员卡片交互：桌面 Hover、移动端点击、键盘回车/空格统一切换展开态。
  const cards = document.querySelectorAll(".team-card");
  const mobile = window.matchMedia("(max-width: 768px)");

  const toggleCard = (card) => {
    card.classList.toggle("team-card--expanded");
  };

  cards.forEach((card) => {
    // 手机/小屏设备使用点击展开。
    card.addEventListener("click", () => {
      if (mobile.matches) toggleCard(card);
    });

    // 键盘可访问性：Enter/Space 同样可切换详情区。
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard(card);
      }
    });
  });
}

// 暴露到 window，供 main.js 统一初始化。
window.initCardInteraction = initCardInteraction;
