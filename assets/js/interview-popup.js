// 메인 페이지: 최신 인터뷰 팝업 (모바일 전용)
// - /interview/ 목록의 첫 번째 카드를 "최신 인터뷰"로 자동 연결
// - 닫은 인터뷰는 localStorage에 기억 → 새 인터뷰가 올라오면 다시 표시
(function () {
  var popup = document.getElementById("interviewPopup");
  if (!popup) return;

  var KEY = "hom-interview-popup";
  var mq = window.matchMedia("(max-width: 768px)");
  var started = false;

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function write(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {}
  }

  function start() {
    if (started) return;
    started = true;

    var listUrl = new URL("./interview/", location.href);

    fetch(listUrl.href, { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var a = doc.querySelector(".interview-page .grid li a");
        var nameEl = a && a.querySelector(".meta-name");
        if (!a || !nameEl) return;

        var url = new URL(a.getAttribute("href"), listUrl);
        var id = url.pathname;
        if (read() === id) return;

        popup.querySelector(".interview-popup__name").textContent =
          nameEl.textContent.trim();
        popup.querySelector(".interview-popup__link").href = url.href;

        popup
          .querySelector(".popup__close button")
          .addEventListener("click", function () {
            write(id);
            popup.classList.remove("on");
          });

        // 스플래시 애니메이션이 끝난 뒤 표시
        setTimeout(function () {
          popup.classList.add("on");
        }, 2800);
      })
      .catch(function () {});
  }

  // 데스크톱에서는 표시하지 않음 (모바일 폭일 때만 동작)
  if (mq.matches) {
    start();
  } else if (mq.addEventListener) {
    mq.addEventListener("change", function (e) {
      if (e.matches) start();
    });
  }
})();
