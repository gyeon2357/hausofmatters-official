// 인터뷰 상세: 읽은 위치 표시 라인(최하단 1px 화이트) + 일정 구간 스크롤 후 노출되는 TOP 버튼
(function () {
  var SHOW_AT = 0.25; // 전체 스크롤 구간의 1/4 지점부터 버튼 노출

  var bar = document.createElement("div");
  bar.className = "read-progress";
  bar.setAttribute("aria-hidden", "true");

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "맨 위로 이동");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5.5 11.5 12 5l6.5 6.5"/></svg>';

  document.body.appendChild(bar);
  document.body.appendChild(btn);

  var ticking = false;
  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = Math.max(doc.scrollHeight - window.innerHeight, 1);
    var y = window.pageYOffset || doc.scrollTop || 0;
    var ratio = Math.min(Math.max(y / max, 0), 1);
    bar.style.transform = "scaleX(" + ratio + ")";
    btn.classList.toggle("show", ratio >= SHOW_AT);
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", update);
  update();

  btn.addEventListener("click", function () {
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  });
})();
