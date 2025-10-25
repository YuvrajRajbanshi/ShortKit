/**
 * Image Optimization Utility
 * Provides functions to optimize image loading and caching
 */

/**
 * Compress image URL by using Cloudinary transformations
 * @param {string} imageUrl - Original image URL
 * @param {object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const optimizeImageUrl = (imageUrl, options = {}) => {
  if (!imageUrl) return "";

  // If it's a Cloudinary URL, add optimization parameters
  if (imageUrl.includes("cloudinary")) {
    const {
      width = 400,
      height = 400,
      quality = "auto",
      format = "webp",
    } = options;

    // Insert transformation parameters before the filename
    const urlParts = imageUrl.split("/upload/");
    if (urlParts.length === 2) {
      const transformations = `w_${width},h_${height},c_limit,q_${quality},f_${format}`;
      return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`;
    }
  }

  return imageUrl;
};

/**
 * Pre-load an image for better performance
 * @param {string} src - Image source URL
 * @returns {Promise} - Resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Generate srcSet for responsive images
 * @param {string} baseUrl - Base image URL
 * @param {array} sizes - Array of sizes like ['400', '600', '800']
 * @returns {string} - srcSet string
 */
export const generateSrcSet = (baseUrl, sizes = ["400", "600", "800"]) => {
  if (!baseUrl || !baseUrl.includes("cloudinary")) return "";

  return sizes
    .map((size) => {
      const urlParts = baseUrl.split("/upload/");
      if (urlParts.length === 2) {
        const transformed = `${urlParts[0]}/upload/w_${size},c_limit,q_auto,f_webp/${urlParts[1]}`;
        return `${transformed} ${size}w`;
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");
};

/**
 * Batch preload images
 * @param {array} imageSources - Array of image URLs
 * @returns {Promise} - Resolves when all images are preloaded
 */
export const preloadImages = (imageSources) => {
  return Promise.all(
    imageSources.map((src) => preloadImage(src).catch(() => null))
  );
};
