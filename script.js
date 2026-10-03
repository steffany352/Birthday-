/* =====================================================
   PASSWORD GATE
===================================================== */

const passwordGate = document.getElementById("passwordGate");
const birthdayPassword = document.getElementById("birthdayPassword");
const unlockBtn = document.getElementById("unlockBtn");
const passwordError = document.getElementById("passwordError");


function unlockWebsite() {

  const enteredPassword =
    birthdayPassword.value.trim();

  if (enteredPassword === "11/12/2008") {

    passwordError.textContent = "";

    passwordGate.style.transition =
      "opacity 0.6s ease";

    passwordGate.style.opacity = "0";

    setTimeout(() => {

      passwordGate.classList.add("hidden");

    }, 600);

  } else {

    passwordError.textContent =
      "Wrong password 😭";

    birthdayPassword.value = "";

    birthdayPassword.focus();

  }

}


unlockBtn.addEventListener(
  "click",
  unlockWebsite
);


birthdayPassword.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      unlockWebsite();
    }

  }
);

/* =====================================================
   SCROLL BUTTONS
===================================================== */

document
  .querySelectorAll("[data-scroll]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          document.getElementById(
            button.dataset.scroll
          );

        if (!target) return;

        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });



/* =====================================================
   VIDEO GALLERY
===================================================== */

const video =
  document.getElementById("memoryVideo");

const videoCurrent =
  document.getElementById("videoCurrent");

const videoTitle =
  document.getElementById("videoTitle");

const videoDescription =
  document.getElementById("videoDescription");

const dots =
  document.querySelectorAll(
    "#videoDots button"
  );

const nextVideo =
  document.getElementById("nextVideo");

const prevVideo =
  document.getElementById("prevVideo");


const videos = [

  {
    src: "videos/video1.mp4",
    title: "Just a little edit 💜",
  },

  {
    src: "videos/video2.mp4",
    title: "First time drawing someone✏️",
    description: "Normally, i draw celebrities or famous people,ive never actually drawn poeple that i know...ohh well"
  },
];


let currentVideo = 0;


function showVideo(index) {

  currentVideo =
    (index + videos.length) %
    videos.length;

  const current =
    videos[currentVideo];


  video.pause();

  video.src = current.src;

  video.load();


  videoCurrent.textContent =
    String(currentVideo + 1)
      .padStart(2, "0");


  videoTitle.textContent =
    current.title;

  videoDescription.textContent =
    current.description;


  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentVideo
    );

  });

}


nextVideo.addEventListener(
  "click",
  () => {

    showVideo(
      currentVideo + 1
    );

  }
);


prevVideo.addEventListener(
  "click",
  () => {

    showVideo(
      currentVideo - 1
    );

  }
);


dots.forEach(
  (dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showVideo(index);

      }
    );

  }
);

/* =====================================================
   LETTER
===================================================== */

const letterBtn =
  document.getElementById("letterBtn");

const envelope =
  document.getElementById("envelope");

const letterCard =
  document.getElementById("letterCard");


letterBtn.addEventListener(
  "click",
  () => {

    envelope.style.transition =
      "opacity 0.5s ease, transform 0.5s ease";

    envelope.style.opacity = "0";

    envelope.style.transform =
      "translateY(-25px) scale(.96)";


    setTimeout(() => {

      envelope.classList.add("hidden");

      letterCard.classList.remove(
        "hidden"
      );


      letterCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 500);

  }
);



/* =====================================================
   SPIN TO WIN
===================================================== */

const finalBtn =
  document.getElementById("finalBtn");

const spinModal =
  document.getElementById("spinModal");

const spinClose =
  document.getElementById("spinClose");

const spinOverlay =
  document.getElementById("spinOverlay");

const spinBtn =
  document.getElementById("spinBtn");

const wheel =
  document.getElementById("wheel");

const spinResult =
  document.getElementById("spinResult");

const claimBtn =
  document.getElementById("claimBtn");


let wheelRotation = 0;
let hasWon = false;


function openSpinModal() {

  spinModal.classList.add("active");

  spinModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

}


function closeSpinModal() {

  spinModal.classList.remove("active");

  spinModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}


finalBtn.addEventListener(
  "click",
  openSpinModal
);


spinClose.addEventListener(
  "click",
  closeSpinModal
);


spinOverlay.addEventListener(
  "click",
  closeSpinModal
);


/* =====================================================
   THE WHEEL IS SECRETLY RIGGED 😂
===================================================== */

spinBtn.addEventListener(
  "click",
  () => {

    if (hasWon) return;

    spinBtn.disabled = true;

    /*
      The wheel always stops on the ₦5k section.

      We add several full rotations so it still
      looks completely random.
    */

    const spins =
      5 + Math.floor(Math.random() * 3);

    /*
      The ₦5k section is positioned at the top
      of the wheel.

      This rotation makes it finish there.
    */

    const targetRotation = 360 * spins + 180;

    wheelRotation += targetRotation;

    wheel.style.transform =
      `rotate(${wheelRotation}deg)`;


    setTimeout(() => {

      hasWon = true;

      spinResult.classList.remove(
        "hidden"
      );

      spinBtn.textContent =
        "₦5,000 WON! 🎉";

    }, 5200);

  }
);


/* =====================================================
   CLAIM PRIZE → ACCOUNT FORM
===================================================== */

const moneyModal =
  document.getElementById("moneyModal");

const moneyClose =
  document.getElementById("moneyClose");

const moneyOverlay =
  document.getElementById("moneyOverlay");


function openMoneyModal() {

  spinModal.classList.remove("active");

  moneyModal.classList.add("active");

  moneyModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeMoneyModal() {

  moneyModal.classList.remove(
    "active"
  );

  moneyModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


claimBtn.addEventListener(
  "click",
  openMoneyModal
);


moneyClose.addEventListener(
  "click",
  closeMoneyModal
);


moneyOverlay.addEventListener(
  "click",
  closeMoneyModal
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      if (
        spinModal.classList.contains(
          "active"
        )
      ) {

        closeSpinModal();

      }

      if (
        moneyModal.classList.contains(
          "active"
        )
      ) {

        closeMoneyModal();

      }

    }

  }
);


/* =====================================================
   PROCESSING ELEMENTS
===================================================== */

const progressBar =
  document.getElementById("progressBar");

const progressText =
  document.getElementById("progressText");

/* =====================================================
   FORMSPREE ACCOUNT FORM
===================================================== */



/* =====================================================
   PROCESSING ANIMATION
===================================================== */

function startProcessing() {

  let progress = 0;


  progressBar.style.width = "0%";

  progressText.textContent =
    "0.0000000% complete.";


  const interval =
    setInterval(() => {

      progress +=
        Math.random() * 1.8;


      if (progress >= 100) {

        progress = 100;

        clearInterval(interval);

      }


      progressBar.style.width =
        `${progress}%`;


      progressText.textContent =
        `${progress.toFixed(7)}% complete.`;


      if (progress === 100) {

        progressText.textContent =
          "100% complete. 🎉";


        setTimeout(
          showFinalSurprise,
          700
        );

      }

    }, 180);

}



/* =====================================================
   FINAL SURPRISE
===================================================== */

function showFinalSurprise() {

  closeMoneyModal();


  const finalMessage =
    document.getElementById(
      "finalMessage"
    );


  finalMessage.classList.remove(
    "hidden"
  );


  finalMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });


  createConfetti();

}



/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

  const symbols = [
    "💜",
    "✨",
    "🎉",
    "💐",
    "🥹",
    "❤️"
  ];


  for (let i = 0; i < 35; i++) {

    const piece =
      document.createElement("div");


    piece.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    piece.style.position =
      "fixed";

    piece.style.left =
      `${Math.random() * 100}vw`;

    piece.style.top =
      "-30px";

    piece.style.fontSize =
      `${15 + Math.random() * 18}px`;

    piece.style.zIndex =
      "999999";

    piece.style.pointerEvents =
      "none";


    document.body.appendChild(
      piece
    );


    const duration =
      2000 +
      Math.random() * 2500;


    piece.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 1
        },

        {
          transform:
            `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing:
          "cubic-bezier(.2,.7,.3,1)"
      }
    );


    setTimeout(
      () => {
        piece.remove();
      },
      duration
    );

  }

}