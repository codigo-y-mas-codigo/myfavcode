lucide.createIcons();

const cards = document.querySelectorAll(".card");
let selectedCards = [];
const rotations = [12, -8, 20, -16];

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const activeToggle = card.querySelector(".active");

    if (!selectedCards.includes(card)) {
      selectedCards.push(card);
      card.classList.add("selected");
      gsap.to(activeToggle, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "elastic.out(0.9, 1)"
      });
    } else {
      selectedCards.splice(selectedCards.indexOf(card), 1);
      card.classList.remove("selected");
      gsap.to(activeToggle, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: "elastic.in(0.9, 1)"
      });
    }

    if (selectedCards.length > 0) {
      gsap.set(".menu", { display: "flex" });
      gsap.to(".menu", {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.3,
        y: -30
      });
    } else {
      gsap.to(".menu", {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.3,
        y: 0
      });
    }

    const deleteBtn = document.querySelector(".delete");
    deleteBtn.textContent = `Delete ${selectedCards.length} ${
      selectedCards.length > 1 ? "Cards" : "Card"
    }`;
  });
});

const trashBtn = document.querySelector(".trash");
trashBtn.addEventListener("click", () => {
  gsap
    .timeline()
    .to(
      ".menu",
      {
        opacity: 0,
        filter: "blur(4px)",
        y: 0,
        ease: "power2.out"
      },
      0
    )
    .set(".menu", { display: "none" })
    .set(".delete", { display: "block" }, 0)
    .to(
      ".delete",
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.3,
        ease: "elastic.in(0.8, 0.8)"
      },
      0
    )
    .set(
      ".selected",
      {
        zIndex: 2
      },
      0
    )
    .set(
      ".toggle",
      {
        opacity: 0
      },
      0
    )
    .set(
      ".card:not(.selected)",
      {
        opacity: 0,
        pointerEvents: "none"
      },
      0
    )
    .set(
      ".trashcan, .trash-shadow",
      {
        display: "block",
        scale: 1.2
      },
      0
    )
    .to(
      ".trashcan",
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.2
      },
      0
    )
    .to(
      ".selected",
      {
        scale: 0.65,
        ease: "elastic.out(0.9, 1)",
        cursor: "default",
        duration: 0.5
      },
      0
    )
    .add(applyRotations, 0)
    .to(
      ".selected.c1",
      {
        x: 90,
        y: -60,
        duration: 0.5,
        ease: "elastic.out(1, 2)"
      },
      0
    )
    .to(
      ".selected.c2",
      {
        x: -90,
        y: -60,
        duration: 0.5,
        ease: "elastic.out(1, 2)"
      },
      0
    )
    .to(
      ".selected.c3",
      {
        x: 90,
        y: -250,
        duration: 0.5,
        ease: "elastic.out(1, 2)"
      },
      0
    )
    .to(
      ".selected.c4",
      {
        x: -90,
        y: -250,
        duration: 0.5,
        ease: "elastic.out(1, 2)"
      },
      0
    )
    .set(
      ".selected",
      {
        zIndex: 0
      },
      "-=0.35"
    )
    .to(
      ".selected",
      {
        y: "+=95",
        ease: "elastic.out(1, 0.7)",
        duration: 0.5
      },
      "-=0.35"
    );
});

function applyRotations() {
  selectedCards.forEach((card, index) => {
    gsap.to(card, {
      rotate: rotations[index],
      duration: 0.5,
      ease: "elastic.out(1, 2)"
    });
  });
}

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  gsap
    .timeline()
    .to(".selected", {
      y: "+=65",
      ease: "elastic.in(1, 0.7)"
    })
    .set(".selected", {
      opacity: 0
    })
    .to(
      ".trashcan, .trash-shadow, .delete",
      {
        opacity: 0,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.in"
      },
      "+=1"
    )
    .set(".trashcan, .trash-shadow, .delete", {
      display: "none"
    })
    .set(".selected", {
      rotate: 0,
      scale: 1,
      x: 0,
      y: 0,
      zIndex: 0
    })
    .set(".card", {
      cursor: "pointer",
      pointerEvents: "auto",
      filter: "blur(10px)"
    })
    .add(reset)
    .to(".card, .toggle", {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.3
    });
});

function reset() {
  selectedCards.forEach((card) => {
    card.classList.remove("selected");
    const activeToggle = card.querySelector(".active");
    gsap.set(activeToggle, {
      opacity: 0,
      scale: 0
    });
  });
  selectedCards = [];
}
