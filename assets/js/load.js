const tl = gsap.timeline({defaults: {ease: "power2.out"}});

let matchMedia = gsap.matchMedia();

matchMedia.add("(min-width: 769px)", () => {
  tl.add("start")
    .to(
      ".logo",
      {
        opacity: 1,
        duration: 0.5,
      },
      "start"
    )
    .to(
      ".loading-text",
      {
        opacity: 1,
        duration: 0.5,
        delay: 0.75,
      },
      "start"
    )

    .to(
      ".intro__popup",
      {
        yPercent: -10,
        opacity: 1,
        duration: 0.75,
        delay: 1.5,
      },
      "start"
    );
});

matchMedia.add("(max-width: 768px)", () => {
  tl.add("start")
    .to(
      ".logo",
      {
        opacity: 1,
        duration: 0.5,
      },
      "start"
    )
    .to(
      ".loading-text",
      {
        opacity: 1,
        duration: 0.75,
        delay: 0.75,
      },
      "start"
    )

    .to(
      ".intro__popup",
      {
        xPercent: -10,
        opacity: 1,
        duration: 0.75,
        delay: 1.5,
      },
      "start"
    );
});

tl.to(".loading", {
  opacity: 0,
  duration: 0.5,
  delay: 0.625,
  display: "none",
});

/* Homepage Content */
tl.fromTo("main", {opacity: 0}, {opacity: 1, duration: 0.5}, "-=1");
