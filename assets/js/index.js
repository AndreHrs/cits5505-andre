// Toggle progress section
function toggleProgressSection() {
  const section = document.querySelector(".progress-section");
  section.classList.toggle("hidden");
}

// Initialize cards and progress
document.addEventListener("DOMContentLoaded", function () {
  const cards = [
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
    { id: 3, title: "Task 3", description: "Description 3" },
  ];

  // Load checked state from localStorage
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];

  // Create cards
  const cardContainer = document.getElementById("cardContainer");
  cards.forEach((card) => {
    const isChecked = checkedItems.includes(card.id);
    cardContainer.innerHTML += `
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${card.title}</h5>
                  <p class="card-text">${card.description}</p>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${
                      card.id
                    }" 
                      ${
                        isChecked ? "checked" : ""
                      } onchange="updateProgress(this)">
                    <label class="form-check-label">Complete</label>
                  </div>
                </div>
              </div>
            </div>
          `;
  });

  updateProgressBar();
  updateLottiePlayer();
});

function updateProgress(checkbox) {
  const checkedItems = Array.from(
    document.querySelectorAll(".form-check-input:checked")
  ).map((input) => parseInt(input.value));

  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  updateProgressBar();
}

function updateProgressBar() {
  const total = document.querySelectorAll(".form-check-input").length;
  const checked = document.querySelectorAll(".form-check-input:checked").length;
  const progress = (checked / total) * 100;

  document.getElementById("progressBar").style.width = `${progress}%`;
  updateLottiePlayer();
}

function updateLottiePlayer() {
  const total = document.querySelectorAll(".form-check-input").length;
  const checked = document.querySelectorAll(".form-check-input:checked").length;
  const progress = (checked / total) * 100;

  // Update Lottie animation based on progress
  if (progress === 100) {
    lottiePlayer.load(
      "https://andrehrs.github.io/cits5505-andre/assets/lottie/5star.lottie"
    );
  } else {
    lottiePlayer.load(
      "https://andrehrs.github.io/cits5505-andre/assets/lottie/1star.lottie"
    );
  }
}
