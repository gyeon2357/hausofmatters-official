// 메인 CONTENTS: 최신 인터뷰 2개 카드를 /interview/ 목록의 맨 위 2개 카드로 자동 갱신
// (HTML에는 현재 최신 2개가 기본값으로 들어 있음)
(function () {
  var cards = document.querySelectorAll("[data-latest-interview]");
  if (!cards.length) return;

  var listUrl = new URL("./interview/", location.href);

  fetch(listUrl.href, { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var items = doc.querySelectorAll(".interview-page .grid li a");

      cards.forEach(function (card, i) {
        var a = items[i];
        if (!a) return;
        var name = a.querySelector(".meta-name");
        var img = a.querySelector(".cover img");
        if (!name) return;

        var href = new URL(a.getAttribute("href"), listUrl).href;
        card.querySelectorAll("a").forEach(function (link) {
          link.href = href;
        });
        card.querySelector(".card__title a").textContent = name.textContent.trim();
        if (img) {
          var src = new URL(img.getAttribute("src"), listUrl).href;
          card.querySelector(".card__image").style.backgroundImage =
            'url("' + src + '")';
        }
      });
    })
    .catch(function () {});
})();
