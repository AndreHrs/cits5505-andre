// Configure prismJs to remove trailing whitespace
Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true,
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Toggle progress section
function toggleProgressSection() {
  const section = document.querySelector(".progress-section");
  section.classList.toggle("hidden");
}

function getCheckedItemsByCategory(category) {
  return Array.from(
    document.querySelectorAll(
      `.form-check-input[data-category="${category}"]:checked`
    )
  ).map((input) => input.value);
}

function updateProgress(checkbox) {
  const category = checkbox.dataset.category;
  const checkedItems = {
    html: getCheckedItemsByCategory("html"),
    css: getCheckedItemsByCategory("css"),
    js: getCheckedItemsByCategory("js"),
  };

  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  updateProgressBars(checkedItems);
}

function updateProgressBars(checkedItems) {
  updateCategoriesProgressBar();

  // Update overall progress
  const total = document.querySelectorAll(".form-check-input").length;
  const checked = document.querySelectorAll(".form-check-input:checked").length;
  const progress = total ? (checked / total) * 100 : 0;
  const roundedProgress = Math.round(progress, 0);

  document.getElementById(
    "overall-progress-text"
  ).textContent = `Overall Progress: ${checked} / ${total} (${roundedProgress}%)`;

  const progressBar = document.getElementById("progressBar");
  updateProgressBarWidthAndText(progressBar, roundedProgress);

  updateProgressBarColor(progressBar, roundedProgress);

  updateLottiePlayer(roundedProgress);
}

function updateCategoriesProgressBar() {
  ["html", "css", "js"].forEach((category) => {
    const total = document.querySelectorAll(
      `.form-check-input[data-category="${category}"]`
    ).length;
    const checked = document.querySelectorAll(
      `.form-check-input[data-category="${category}"]:checked`
    ).length;
    const progress = total ? (checked / total) * 100 : 0;

    document.getElementById(
      `${category}ProgressBar`
    ).style.width = `${progress}%`;
  });
}

function updateProgressBarWidthAndText(progressBar, roundedProgress) {
  progressBar.style.width = `${roundedProgress}%`;
  progressBar.textContent = `${roundedProgress}%`;
}

function updateProgressBarColor(progressBar, roundedProgress) {
  progressBar.classList.remove(
    "bg-success",
    "bg-info",
    "bg-warning",
    "bg-danger"
  );
  const colorMapping = [
    {
      threshold: 100,
      color: "bg-success",
    },
    {
      threshold: 75,
      color: "bg-info",
    },
    {
      threshold: 50,
      color: "bg-warning",
    },
    {
      threshold: 0,
      color: "bg-danger",
    },
  ];

  for (let mapping of colorMapping) {
    if (roundedProgress >= mapping.threshold) {
      progressBar.classList.add(mapping.color);
      break;
    }
  }
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

// Update your DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || {
    html: [],
    css: [],
    js: [],
  };

  // Restore checked state for each category
  Object.entries(checkedItems).forEach(([category, items]) => {
    items.forEach((value) => {
      const checkbox = document.querySelector(
        `.form-check-input[data-category="${category}"][value="${value}"]`
      );
      if (checkbox) checkbox.checked = true;
    });
  });

  // Initialize all progress bars
  updateProgressBars(checkedItems);
});
