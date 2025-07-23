$(document).ready(function () {
  // 로딩 화면 클릭 시 사라지기
  $(".loading").on("click", function () {
    $(this).fadeOut();
    $("main").css("opacity", "1");
  });

  let isMobileBound = false;

  function bindMobilePopup() {
    const isMobile = device.mobile() || $(window).width() <= 768;

    const $popupBtn = $(".intro__popup > p");
    const $menu = $(".menu__contents");
    const $commentPopup = $(".comment-content-wrap");

    // 모바일 팝업 toggle
    if (isMobile && !isMobileBound) {
      $popupBtn.on("click.mobile", function (e) {
        e.stopPropagation();
        $(this).toggleClass("active");
        $(this).next().toggleClass("active");
      });

      isMobileBound = true;
    } else if (!isMobile && isMobileBound) {
      $popupBtn.off(".mobile");
      isMobileBound = false;
    }

    // main 클릭 시 팝업 및 메뉴 닫기 (모바일 여부와 관계없이 항상 동작)
    $("main")
      .off(".menuClose")
      .on("click.menuClose", function () {
        // 팝업 닫기 (모바일에서만 열릴 수 있으므로 여기도 포함)
        $popupBtn.removeClass("active");
        $popupBtn.next().removeClass("active");

        // 메뉴 닫기
        $(".menu__btn__wrap, .menu__contents").removeClass("is_active");
        $("header .logo").removeClass("open");
        $("main").removeClass("open");

        // 300ms 후 z-index 비활성화
        setTimeout(() => {
          if (!$menu.hasClass("is_active")) {
            $menu.css({
              "z-index": "-1",
              "pointer-events": "none",
            });
          }
        }, 300);
      });
  }

  // 모바일 메뉴 버튼 클릭 시 toggle
  $(".menu__btn").on("click", function () {
    $(".menu__btn__wrap, .menu__contents").toggleClass("is_active");
    $("header .logo").toggleClass("open");

    const $menu = $(".menu__contents");
    const isActive = $menu.hasClass("is_active");

    if (isActive) {
      // 활성화 상태: 즉시 적용
      $menu.css({
        "z-index": "101",
        "pointer-events": "auto",
      });

      // <main>에 클래스 추가
      $("main").addClass("open");
    } else {
      // 비활성화 상태: 딜레이 후 적용
      $("main").removeClass("open");

      setTimeout(() => {
        // 여전히 비활성 상태인 경우에만 적용
        if (!$menu.hasClass("is_active")) {
          $menu.css({
            "z-index": "-1",
            "pointer-events": "none",
          });

          // <main> 클래스 제거
        }
      }, 1500); // 300ms 지연 후 적용
    }
  });

  // 초기 실행
  bindMobilePopup();

  // 창 크기 변경 시 다시 바인딩
  $(window).on("resize", function () {
    bindMobilePopup();
  });

  let lastScrollTop = 0;

  window.addEventListener("resize", function () {
    const active = document.activeElement;
    const isInput =
      active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");

    if (isInput) {
      // 키보드 올라온 것 감지
      window.scrollTo(0, lastScrollTop);
    } else {
      // 키보드 사라짐
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }
  });

  // 매거진 뷰 버튼
  $(".row-switch figure").on("click", function () {
    $(this).toggle();
    $(this).siblings("figure").toggle();
    $(".thumb-wrapper figcaption.caption").removeClass("expand");

    $(".thumb-container .thumb-wrapper").toggleClass("expand");

    const theOffset = $(".thumb-container .thumb-wrapper").offset();
    $("html, body").animate(
      {
        scrollTop: theOffset.top - 100,
      },
      0
    );
  });

  // Comment popup
  $(".comment-switch > figure").on("click", function () {
    $(this).toggle();
    $(this).siblings("figure").toggle();

    $(this).siblings(".comment-content-wrap").toggleClass("active");
  });

  // Localstorage mag__popup
  var toggleMainPopup = function () {
    /* 스토리지 제어 함수 정의 */
    var handleStorage = {
      // 스토리지에 데이터 쓰기(이름, 만료일)
      setStorage: function (name, exp) {
        // 만료 시간 구하기(exp를 ms단위로 변경)
        var date = new Date();
        date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

        // 로컬 스토리지에 저장하기
        // (값을 따로 저장하지 않고 만료 시간을 저장)
        localStorage.setItem(name, date);
      },
      // 스토리지 읽어오기
      getStorage: function (name) {
        var now = new Date();
        now = now.setTime(now.getTime());
        // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
        // 시간이 남아 있으면 true, 아니면 false 리턴
        return parseInt(localStorage.getItem(name)) > now;
      },
    };

    // 쿠키 읽고 화면 보이게
    if (handleStorage.getStorage("hom-data")) {
      $(".mag__popup").removeClass("on");
    } else {
      $(".mag__popup").addClass("on");
    }

    // 오늘하루 보지 않기 버튼
    $(".popup__close").on("click", "button", function () {
      // 로컬 스토리지에 hom-data이라는 이름으로 1일(24시간 뒤) 동안 보이지 않게
      handleStorage.setStorage("hom-data", 1);
      $(this).parents(".mag__popup.on").removeClass("on");
    });

    // 일반 닫기 버튼
    $(".popup__close")
      .find("button")
      .click(function () {
        $(".mag__popup").css("display", "none");
      });
  };

  $(function () {
    toggleMainPopup();
  });

  // mag__popup end

  // header search btn
  $(".menu__search__btn").on("click", function (e) {
    e.preventDefault(); // 링크일 경우 방지

    // 스크롤 이동
    $("html, body").animate(
      {
        scrollTop: $("#searchInput").offset().top - 80,
      },
      400,
      function () {
        $("#searchInput").focus(); // 포커스도 줌
      }
    );
  });
});

// var homSwiper = new Swiper(".hom-swiper", {
//   loop: true,
//   speed: 2000,
//   autoplay: {
//     delay: 100,
//     disableOnInteraction: true,
//   },
//   slidesPerView: 6,
//   spaceBetween: 10,
//   breakpoints: {
//    768: {
//       slidesPerView: 4,
//     },
//     1200: {
//       slidesPerView: 5,
//     },
//   },
// });

// var whomSwiper = new Swiper(".w-hom-swiper", {
//   loop: true,

//   speed: 2000,
//   autoplay: {
//     delay: 100,
//     disableOnInteraction: true,
//     reverseDirection: true,
//   },
//   slidesPerView: 6,
//   spaceBetween: 10,
//   breakpoints: {
//     768: {
//       slidesPerView: 4,
//     },
//     1200: {
//       slidesPerView: 5,
//     },
//   },
// });
