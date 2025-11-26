// E-ZOOS.BIZ Pixelation Effect
// Creates authentic chunky mosaic effect like early 2000s clip art

/**
 * Pixelates an image using canvas
 * @param {HTMLImageElement} img - The image element to pixelate
 * @param {number} pixelSize - How chunky the pixels should be (higher = chunkier)
 */
function pixelateImage(img, pixelSize) {
    // Wait for image to load
    if (!img.complete) {
        img.onload = function() {
            pixelateImage(img, pixelSize);
        };
        return;
    }

    // Get original dimensions
    var originalWidth = img.naturalWidth || img.width;
    var originalHeight = img.naturalHeight || img.height;

    // Calculate scaled down size
    var scaledWidth = Math.ceil(originalWidth / pixelSize);
    var scaledHeight = Math.ceil(originalHeight / pixelSize);

    // Create small canvas for pixelation
    var smallCanvas = document.createElement('canvas');
    smallCanvas.width = scaledWidth;
    smallCanvas.height = scaledHeight;
    var smallCtx = smallCanvas.getContext('2d');

    // Disable smoothing for crisp pixels
    smallCtx.imageSmoothingEnabled = false;
    smallCtx.mozImageSmoothingEnabled = false;
    smallCtx.webkitImageSmoothingEnabled = false;
    smallCtx.msImageSmoothingEnabled = false;

    // Draw image at small size
    smallCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

    // Create display canvas at original size
    var displayCanvas = document.createElement('canvas');
    var displayWidth = parseInt(img.getAttribute('width')) || originalWidth;
    var displayHeight = parseInt(img.getAttribute('height')) || originalHeight;
    displayCanvas.width = displayWidth;
    displayCanvas.height = displayHeight;
    var displayCtx = displayCanvas.getContext('2d');

    // Disable smoothing
    displayCtx.imageSmoothingEnabled = false;
    displayCtx.mozImageSmoothingEnabled = false;
    displayCtx.webkitImageSmoothingEnabled = false;
    displayCtx.msImageSmoothingEnabled = false;

    // Scale small canvas up to display size (creates chunky pixels)
    displayCtx.drawImage(smallCanvas, 0, 0, displayWidth, displayHeight);

    // Copy classes and styles
    displayCanvas.className = img.className + ' pixelated-canvas';
    displayCanvas.style.cssText = img.style.cssText;

    // Add title/alt as data attribute
    if (img.alt) {
        displayCanvas.setAttribute('data-alt', img.alt);
        displayCanvas.setAttribute('title', img.alt);
    }

    // Replace image with canvas
    if (img.parentNode) {
        img.parentNode.replaceChild(displayCanvas, img);
    }

    return displayCanvas;
}

/**
 * Pixelates all images with data-pixelate attribute
 */
function pixelateAllImages() {
    var images = document.querySelectorAll('img[data-pixelate]');

    images.forEach(function(img) {
        var pixelSize = parseInt(img.getAttribute('data-pixelate')) || 8;

        // Handle cross-origin images
        if (img.src.indexOf('http') === 0 && img.src.indexOf(window.location.origin) !== 0) {
            img.crossOrigin = 'anonymous';
        }

        if (img.complete && img.naturalWidth > 0) {
            pixelateImage(img, pixelSize);
        } else {
            img.onload = function() {
                pixelateImage(img, pixelSize);
            };
            img.onerror = function() {
                console.log('Could not load image for pixelation:', img.src);
            };
        }
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pixelateAllImages);
} else {
    // Small delay to ensure images have started loading
    setTimeout(pixelateAllImages, 100);
}

// Export for manual use
window.pixelateImage = pixelateImage;
window.pixelateAllImages = pixelateAllImages;
