let isImageLoaded = true;

function toggleImage(button) {
  const exampleImage = document.getElementById("html2-example-image");

  // Store the image sources
  const originalSrc =
    "./assets/images/hannah-olinger-8eSrC43qdro-unsplash.webp";
  const unloadedSrc = "./assets/images/undefined.jpg";

  if (isImageLoaded) {
    // Unload the image
    exampleImage.src = unloadedSrc;
    button.textContent = "load image";
  } else {
    // Load the original image
    exampleImage.src = originalSrc;
    button.textContent = "unload image";
  }

  isImageLoaded = !isImageLoaded;
}
