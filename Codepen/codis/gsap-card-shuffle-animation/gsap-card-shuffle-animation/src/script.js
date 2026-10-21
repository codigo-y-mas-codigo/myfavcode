let cards = document.querySelectorAll(".card");
let cardsMidIndex = Math.floor(cards.length / 2);
let yOffset = 60;
let scaleOffset = 0.02;
let duration = 0.8;
let scaleDuration = duration / 3;
let tl = gsap.timeline({ repeat: -1, yoyoEase: true });

function driftIn() {
  return gsap.timeline().from(".cards", {
    yPercent: -yOffset / 3,
    duration,
    ease: "power2.inOut",
    yoyoEase: true
  });
}

function driftOut() {
  return gsap.timeline().to(".cards", {
    yPercent: yOffset / 3,
    duration,
    ease: "power2.inOut",
    yoyoEase: true
  });
}

function scaleCards() {
  return gsap
    .timeline()
    .to(".card", {
      scale: (i) => {
        if (i <= cardsMidIndex) {
          return 1 - i * scaleOffset;
        } else {
          return 1 - (cards.length - 1 - i) * scaleOffset;
        }
      },
      delay: duration / 3,
      duration: scaleDuration,
      ease: "expo.inOut",
      yoyoEase: true
    })
    .to(".card", { scale: 1, duration: scaleDuration });
}

function shuffleCards() {
  return gsap
    .timeline()
    .set(".card", {
      y: (i) => -i * 0.5
    })
    .fromTo(
      ".card",
      {
        rotate: 45,
        yPercent: -yOffset
      },
      {
        duration,
        rotate: 65,
        yPercent: yOffset,
        stagger: duration * 0.03,
        ease: "expo.inOut",
        yoyoEase: true
      }
    );
}

function shuffleDeck() {
  tl.add(driftIn())
    .add(shuffleCards(), "<")
    .add(scaleCards(), "<")
    .add(driftOut(), "<55%");
}

shuffleDeck();
