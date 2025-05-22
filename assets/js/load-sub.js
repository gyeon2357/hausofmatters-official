const tl = gsap.timeline({defaults: {ease: "power2.out"}});
var items = gsap.utils.toArray(".thumb");

tl.add("start")
  .to(
    ".logo",
    {
      opacity: 1,
      duration: 0.375,
    },
    "start"
  )
  .to(
    ".loading-text",
    {
      opacity: 1,
      duration: 0.375,
      delay: 0.625,
    },
    "start"
  );

tl.to(".loading", {
  opacity: 0,
  duration: 0.5,
  delay: 1.5,
  display: "none",
});

/* HOME PAGE CONTENT ANIMATION */
tl.fromTo("main", {opacity: 0}, {opacity: 1, duration: 0.5}, "-=1");

// items.forEach((item) => {
//   gsap.to(item, {
//     autoAlpha: 0,
//     scrollTrigger: {
//       trigger: item,
//       start: "bottom center+=150",
//       scrub: true,
//       end: "+=600",
//       opacity: 0,
//     },
//   });
// });
