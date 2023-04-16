// Import sharp and fs modules
const sharp = require('sharp')
const fs = require('fs')

// Define the input and output folders
const inputFolder = './static/img/gallery/b'
const outputFolder = './static/img/gallery/bing'
let count = 1

// Create the output folder if it doesn't exist
createOutputFolder(outputFolder)

// Read all jpg files in the input folder
readJpgFiles(inputFolder)

// Create the output folder if it doesn't exist
function createOutputFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}

// Read all jpg files in the input folder
function readJpgFiles(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(err)
    } else {
      // Filter only jpg files
      const jpgFiles = files.filter((file) => file.endsWith('.jpg'))
      // Loop through each file
      jpgFiles.forEach((file) => {
        // Get the input file path
        const inputFilePath = `${folder}/${file}`
        // Get the output file path
        const outputFilePath = `${outputFolder}/${count}.jpg`
        count = count + 1
        // Resize and optimize the image using sharp
        resizeAndOptimizeImage(inputFilePath, outputFilePath)
      })
    }
  })
}

// Resize and optimize the image using sharp
function resizeAndOptimizeImage(inputFile, outputFile) {
  sharp(inputFile)
    .resize({
      // Resize options
      width: 800, // Set the width to 800 pixels
      height: 600, // Set the height to 600 pixels
      fit: 'inside', // Resize the image to fit within the specified dimensions
      withoutEnlargement: true,
    })
    .jpeg({
      // JPEG options
      quality: 95, // Set the quality to 90%
      progressive: true, // Use progressive encoding
    })
    .toFile(outputFile) // Save the output file
    .then((info) => {
      // Handle success
      console.log('Image resized and optimized:', info)
    })
    .catch((err) => {
      // Handle error
      console.error('Error:', err)
    })
}
