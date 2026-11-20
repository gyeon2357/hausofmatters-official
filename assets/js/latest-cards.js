// "Other contents" 카드: HOM / w/HOM 카드 이미지를 최신호 섬네일로 자동 교체
// - assets/json/hom.json, w-hom.json 에서 번호가 가장 큰 섬네일을 사용 (메인 페이지와 동일한 규칙)
// - HTML에는 현재 최신호가 기본값으로 들어 있고, 새 호가 추가되면 이 스크립트가 자동으로 갱신
(function () {
  var script = document.currentScript;
  if (!script) return;
  var assets = new URL("../", script.src); // .../assets/js/ -> .../assets/

  function apply(selector, jsonFile, pattern) {
    var cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    fetch(new URL("json/" + jsonFile, assets).href)
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(function (list) {
        var best = null;
        list.forEach(function (item) {
          var m = (item.thumbnail || "").match(pattern);
          if (m && (!best || +m[1] > best.n)) best = { n: +m[1], file: item.thumbnail };
        });
        if (!best) return;
        var url = new URL("images/thumb/" + best.file, assets).href;
        cards.forEach(function (el) {
          el.style.backgroundImage = 'url("' + url + '")';
        });
      })
      .catch(function () {});
  }

  apply('a.card__image[href$="/hom/"]:not([href$="/w-hom/"])', "hom.json", /^hom-(\d+)\.(?:jpg|gif)$/i);
  apply('a.card__image[href$="/w-hom/"]', "w-hom.json", /^w-hom-(\d+)\.(?:jpg|gif)$/i);
})();
