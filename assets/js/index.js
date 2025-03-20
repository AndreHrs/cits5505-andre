// Toggle progress section
function toggleProgressSection() {
  const section = document.querySelector(".progress-section");
  section.classList.toggle("hidden");
}

function updateProgress(currentContext) {
  const checkedItems = Array.from(
    document.querySelectorAll(".form-check-input:checked")
  ).map((input) => parseInt(input.value));

  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  updateProgressBar();
}

function updateProgressBar() {
  const total = document.querySelectorAll(".form-check-input").length;
  const checked = document.querySelectorAll(".form-check-input:checked").length;
  const progress = total ? (checked / total) * 100 : 0;

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${progress}%`;
  updateLottiePlayer();
}

function updateLottiePlayer() {
  const total = document.querySelectorAll(".form-check-input").length;
  const checked = document.querySelectorAll(".form-check-input:checked").length;
  const progress = total ? (checked / total) * 100 : 0;

  const lottieStarMapping = [
    {
      threshold: 100,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/5star.lottie",
    },
    {
      threshold: 80,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/4star.lottie",
    },
    {
      threshold: 60,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/3star.lottie",
    },
    {
      threshold: 40,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/2star.lottie",
    },
    {
      threshold: 0,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/1star.lottie",
    },
  ];

  const lottiePandaMapping = [
    {
      threshold: 100,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/panda-computer.lottie",
    },
    {
      threshold: 75,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/panda-laptop.lottie",
    },
    {
      threshold: 50,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/panda-music.lottie",
    },
    {
      threshold: 0,
      url: "https://andrehrs.github.io/cits5505-andre/assets/lottie/panda-disconnect.lottie",
    },
  ];

  for (let item of lottieStarMapping) {
    if (progress >= item.threshold) {
      lottiePlayerStar.load(item.url);
      break;
    }
  }

  for (let item of lottiePandaMapping) {
    if (progress >= item.threshold) {
      lottiePlayerPanda.load(item.url);
      break;
    }
  }
}

// On page load, restore checked state from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    const id = parseInt(checkbox.value);
    if (checkedItems.includes(id)) {
      checkbox.checked = true;
    }
  });
  updateProgressBar();
});
