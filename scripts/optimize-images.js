
// Image optimization script - run at build time
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Add 'sharp' dependency
// npm install sharp --save-dev

// Directories to process
const directories = [
  'public/lovable-uploads'
];

// Sizes for responsive images
const sizes = [320, 640, 1024, 1280];

// Process all images in the specified directories
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  let totalImages = 0;
  let optimizedImages = 0;
  let errorImages = 0;
  
  for (const dir of directories) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      // Skip non-image files and already optimized files
      if (!isImageFile(file) || file.includes('.optimized.')) {
        continue;
      }
      
      totalImages++;
      
      try {
        // Create optimized versions of the image
        await processImage(filePath);
        optimizedImages++;
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        errorImages++;
      }
    }
  }
  
  console.log(`Image optimization complete!`);
  console.log(`Total images processed: ${totalImages}`);
  console.log(`Successfully optimized: ${optimizedImages}`);
  console.log(`Errors: ${errorImages}`);
}

// Check if a file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
}

// Process a single image
async function processImage(filePath) {
  const dir = path.dirname(filePath);
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  
  // Create WebP version
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(path.join(dir, `${basename}.optimized.webp`));
  
  // Create responsive versions for larger images
  const metadata = await sharp(filePath).metadata();
  
  // Only create multiple sizes for larger images
  if (metadata.width > 640) {
    for (const size of sizes) {
      // Skip sizes larger than the original
      if (size >= metadata.width) continue;
      
      // Create resized WebP
      await sharp(filePath)
        .resize(size)
        .webp({ quality: 75 })
        .toFile(path.join(dir, `${basename}.${size}.webp`));
    }
  }
}

// Run the optimization
optimizeImages();
