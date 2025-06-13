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
});

var homSwiper = new Swiper(".hom-swiper", {
  loop: true,
  speed: 400,
  autoplay: {
    delay: 1000,
    disableOnInteraction: true,
  },
  slidesPerView: 6,
  spaceBetween: 10,
  breakpoints: {
    900: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 1,
    },
  },
});

var whomSwiper = new Swiper(".w-hom-swiper", {
  loop: true,

  speed: 400,
  autoplay: {
    delay: 1000,
    disableOnInteraction: true,
    reverseDirection: true,
  },
  slidesPerView: 6,
  spaceBetween: 10,
  breakpoints: {
    900: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 1,
    },
  },
});
