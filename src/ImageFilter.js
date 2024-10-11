import {
  gaussianBlur,
  applyVignette,
  applyColorTint,
  enhanceContrast,
} from "./filters/index.js";
export function applyHeavyFilter(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Apply Gaussian Blur
  imageData = gaussianBlur(imageData, 5); // Strong blur
  // Apply Vignette
    imageData = applyVignette(imageData, 0.8); // Strong vignette effect
    // Apply Color Tint (e.g., a warm tint)
    imageData = applyColorTint(imageData, 30, 20, 10); // R, G, B values
    // Enhance Contrast
    imageData = enhanceContrast(imageData, 1.5); // Increase contrast

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// src/ImageFilter.js
