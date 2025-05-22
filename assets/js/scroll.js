const images = document.querySelectorAll(".grid__item-img");

images.forEach(image => {
  let tl = gsap.timeline();

  tl.from(image, {
    scrollTrigger: {
      trigger: image,
      // start: "top bottom",
      start: "bottom center+=300",
      end: "left top",

      toggleActions: "restart none none none",

      scrub: true,
    },
    ease: "power3.out",
    clipPath: "inset(0% 100% 0% 0%)",

    duration: 1,
  });
});
