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

function showAlert() {
  const secretToken =
    "CVRXma22vcbXYRMdSGP_this_is_just_example_lol_MUAcZ13gug1FGGx6IpT";
  const expectedInjection = 'alert("Hacked your hidden text =" + secretToken)';
  const input = document.getElementById("userInput").value;
  if (input !== expectedInjection) {
    alert(
      "I see what you did there (ㆆ_ㆆ).\nOf course I will validate the input before executing it."
    );
  } else {
    eval(input);
  }
}

function scrollToTop() {
  document
    .getElementById("header1")
    .scrollIntoView(false, { behavior: "smooth" });
}

// Toggle progress section
function toggleProgressSection() {
  const section = document.querySelector(".progress-section");
  section.classList.toggle("hidden");
}

function getCheckedItemsByCategory(category) {
  return Array.from(
    document.querySelectorAll(
      `.form-check-input-required[data-category="${category}"]:checked`
    )
  ).map((input) => input.value);
}

function updateProgress(checkbox) {
  // const category = checkbox.dataset.category;
  const checkedItems = {
    html: getCheckedItemsByCategory("html"),
    css: getCheckedItemsByCategory("css"),
    js: getCheckedItemsByCategory("js"),
  };

  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  updateProgressBars(checkedItems);
}

function updateProgressBars(checkedItems) {
  document.getElementById("breakdown-progress-text").textContent = " ";
  updateCategoriesProgressBar();

  // Update overall progress
  const total = document.querySelectorAll(".form-check-input-required").length;
  const checked = document.querySelectorAll(
    ".form-check-input-required:checked"
  ).length;
  const progress = total ? (checked / total) * 100 : 0;
  const roundedProgress = Math.round(progress, 0);

  document.getElementById(
    "overall-progress-text"
  ).textContent = `Overall Progress: ${checked} / ${total} (${roundedProgress}%)`;

  // Show completion modal if progress is 100%
  showModalBasedOnProgress(roundedProgress);

  const progressBar = document.getElementById("progressBar");
  updateProgressBarWidthAndText(progressBar, roundedProgress);

  updateProgressBarColor(progressBar, roundedProgress);

  updateLottiePlayer(roundedProgress);
}

function unloadCelebratoryImage() {
  const dogImage = document.getElementById("dogImage");
  dogImage.classList.add("d-none");
  document.getElementById("figCaption").textContent = "";
}

// Function to check if URL is an image
function isImageUrl(url) {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
}

function loadCelebratoryImage() {
  const MAX_RETRIES = 3;
  let retries = 0;

  // Show loading spinner
  const spinner = document.getElementById("loadingSpinner");
  const dogImage = document.getElementById("dogImage");
  const figCaption = document.getElementById("figCaption");
  spinner.classList.remove("d-none");
  dogImage.classList.add("d-none");

  function fallBackDefaultImage() {
    spinner.classList.add("d-none");
    dogImage.classList.remove("d-none");
    dogImage.src = "./assets/images/much-wow.jpg";
    figCaption.textContent =
      "Aww... I should've fetched even cuter image for you but it seems the service is unavailable.😔\
        But here is a doge celebratory picture for your success 🎉";
  }

  function fetchDogImage() {
    if (retries >= MAX_RETRIES) {
      console.error("Max retries reached. Falling back to doge image");
      fallBackDefaultImage();
      return;
    }
    retries++;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let url = JSON.parse(this.response).url;
        // If not an image, try again
        if (!isImageUrl(url)) {
          console.log("Received non-image format, trying again...");
          fetchDogImage();
          return;
        }

        // Load image
        dogImage.onload = () => {
          spinner.classList.add("d-none");
          dogImage.classList.remove("d-none");
          figCaption.textContent = "🥳 Celebratory picture for your success 🎉";
        };

        dogImage.onerror = () => {
          console.error("Error loading image, trying again...");
          fetchDogImage();
        };

        dogImage.src = url;
      } else if (this.readyState == 4 && this.status != 200) {
        console.error(
          `Error fetching dog image, fallback to default image | status: ${this.status} | response: ${this.response}`
        );
        fallBackDefaultImage();
      }
    };
    xhttp.open("GET", "https://random.dog/woof.json", true);
    xhttp.send();
  }
  fetchDogImage();
}

function showModalBasedOnProgress(roundedProgress) {
  if (roundedProgress === 100) {
    const completionModal = new bootstrap.Modal(
      document.getElementById("completionModal")
    );
    loadCelebratoryImage();
    completionModal.show();
  } else {
    unloadCelebratoryImage();
  }
}

function updateCategoriesProgressBar() {
  let strList = [];
  ["html", "css", "js"].forEach((category) => {
    console.log("category", category);
    const total = document.querySelectorAll(
      `.form-check-input-required[data-category="${category}"]`
    ).length;
    const checked = document.querySelectorAll(
      `.form-check-input-required[data-category="${category}"]:checked`
    ).length;
    const progress = total ? (checked / total) * 100 : 0;

    document.getElementById(
      `${category}ProgressBar`
    ).style.width = `${progress}%`;

    strList.push(
      `${category.toUpperCase()}: ${checked} / ${total} (${Math.round(
        progress,
        0
      )}%)`
    );
  });
  document.getElementById("breakdown-progress-text").textContent =
    strList.join(" | ");
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
  const total = document.querySelectorAll(".form-check-input-required").length;
  const checked = document.querySelectorAll(
    ".form-check-input-required:checked"
  ).length;
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
        `.form-check-input-required[data-category="${category}"][value="${value}"]`
      );
      if (checkbox) checkbox.checked = true;
    });
  });

  // Initialize all progress bars
  updateProgressBars(checkedItems);
});

window.addEventListener("scroll", function () {
  const scrollButton = document.getElementById("scrollTopButton");
  if (window.scrollY > window.innerHeight) {
    scrollButton.classList.remove("d-none");
  } else {
    scrollButton.classList.add("d-none");
  }
});
