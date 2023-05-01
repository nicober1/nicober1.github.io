const sharp = require('sharp')
const fs = require('fs')

const inputFolder = './static/img/gallery/input'
const outputFolder = './static/img/gallery/output'
let count = 1

createOutputFolder(outputFolder)

readJpgFiles(inputFolder)

function createOutputFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}

function readJpgFiles(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(err)
    } else {
      const jpgFiles = files.filter((file) => file.endsWith('.JPG'))

      jpgFiles.forEach((file) => {
        const inputFilePath = `${folder}/${file}`

        const outputFilePath = `${outputFolder}/${count}.jpg`
        count = count + 1

        resizeAndOptimizeImage(inputFilePath, outputFilePath)
      })
    }
  })
}

function resizeAndOptimizeImage(inputFile, outputFile) {
  sharp(inputFile)
    .resize({
      width: 800,
      height: 600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 95,
      progressive: true,
    })
    .toFile(outputFile)
    .then((info) => {
      console.log('Image resized and optimized:', info)
    })
    .catch((err) => {
      console.error('Error:', err)
    })
}
