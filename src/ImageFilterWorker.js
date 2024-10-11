
self.onmessage = (event) => {
  let processedImageData = event.data;

  processedImageData = gaussianBlur(processedImageData, 5); 

  processedImageData = applyVignette(processedImageData, 0.8); 

  processedImageData = applyColorTint(processedImageData, 30, 20, 10);

  processedImageData = enhanceContrast(processedImageData, 1.5);

  self.postMessage(processedImageData);
};


function gaussianBlur(imageData, radius) {
    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;
    const blurredData = new Uint8ClampedArray(pixels.length);
    const kernelSize = radius * 2 + 1;
  
    const kernel = new Float32Array(kernelSize * kernelSize);
    let totalWeight = 0;
  
    // Create Gaussian kernel
    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        const weight = Math.exp(-(x * x + y * y) / (2 * radius * radius));
        kernel[(y + radius) * kernelSize + (x + radius)] = weight;
        totalWeight += weight;
      }
    }
  
    // Normalize kernel
    for (let i = 0; i < kernel.length; i++) {
      kernel[i] /= totalWeight;
    }
  
    // Apply Gaussian blur
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
  
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const pixelX = Math.min(width - 1, Math.max(0, x + kx));
            const pixelY = Math.min(height - 1, Math.max(0, y + ky));
            const pixelIndex = (pixelY * width + pixelX) * 4;
  
            const weight = kernel[(ky + radius) * kernelSize + (kx + radius)];
            r += pixels[pixelIndex] * weight;
            g += pixels[pixelIndex + 1] * weight;
            b += pixels[pixelIndex + 2] * weight;
            a += pixels[pixelIndex + 3] * weight;
          }
        }
  
        const index = (y * width + x) * 4;
        blurredData[index] = r;
        blurredData[index + 1] = g;
        blurredData[index + 2] = b;
        blurredData[index + 3] = a;
      }
    }
  
    return new ImageData(blurredData, width, height);
  }
  
function applyVignette(imageData, strength = 0.5) {
    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;
  
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const factor = Math.pow(distance / maxDist, strength);
  
        // Darken the edges
        pixels[index] *= 1 - factor;
        pixels[index + 1] *= 1 - factor;
        pixels[index + 2] *= 1 - factor;
      }
    }
  
    return imageData;
  }
  
 function applyColorTint(imageData, r = 0, g = 0, b = 0) {
    const pixels = imageData.data;
  
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] += r; // Red
      pixels[i + 1] += g; // Green
      pixels[i + 2] += b; // Blue
    }
  
    return imageData;
  }
  
  function enhanceContrast(imageData, factor = 1.5) {
    const pixels = imageData.data;
  
    for (let i = 0; i < pixels.length; i += 4) {
      for (let j = 0; j < 3; j++) {
        const newValue = (pixels[i + j] - 128) * factor + 128;
        pixels[i + j] = Math.min(255, Math.max(0, newValue));
      }
    }
  
    return imageData;
  }
  
