// 접근성 보조 스크립트
// 1) 메뉴 오버레이: 닫혀 있을 땐 포커스/스크린리더에서 제외, 버튼 상태(aria-expanded/label) 동기화, ESC로 닫기
// 2) role="button" 요소(div/figure 등)를 Enter/Space 키로 조작
// 3) "동작 줄이기" 설정 시 GSAP 연출을 거의 즉시 끝냄 (부드러운 스크롤은 smoothscroll.js 에서 비활성화)
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) menu overlay
  var menu = document.getElementById("siteMenu");
  var btn = document.querySelector(".menu__btn");
  if (menu && btn) {
    var sync = function () {
      var open = menu.classList.contains("is_active");
      if (open) {
        menu.removeAttribute("inert");
        menu.removeAttribute("aria-hidden");
      } else {
        menu.setAttribute("inert", "");
        menu.setAttribute("aria-hidden", "true");
      }
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    };
    new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ["class"] });
    sync();

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is_active")) {
        btn.click();
        btn.focus();
      }
    });
  }

  // 2) keyboard support for non-<button> controls
  document.addEventListener("keydown", function (e) {
    var el = e.target;
    if (!el || el.tagName === "BUTTON" || el.tagName === "A") return;
    if (el.getAttribute && el.getAttribute("role") === "button" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      el.click();
    }
  });

  // 3) reduced motion
  if (reduce && window.gsap && gsap.globalTimeline) {
    gsap.globalTimeline.timeScale(20);
  }
})();
