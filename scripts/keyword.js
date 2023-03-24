const fs = require('fs')

const categories = ['technology', 'react', 'azure']
const technologyKeywords = [
  'cloud computing',
  'artificial intelligence',
  'web development',
  'devops',
  'microservices',
  'serverless architecture',
  'javascript',
  'typescript',
  'node.js',
  'docker',
]
const reactKeywords = ['react native', 'redux', 'graphql', 'vue.js', 'angular']
const azureKeywords = [
  'azure services',
  'azure devops',
  'azure functions',
  'azure cosmos db',
  'azure app service',
  'azure kubernetes service',
  'azure storage',
  'azure sql database',
  'azure machine learning',
  'azure cognitive services',
]

// Merge all the categories into a single array
const allKeywords = [...technologyKeywords, ...reactKeywords, ...azureKeywords]

// Generate a list of 1000 unique keywords
const keywords = []
while (keywords.length < 40) {
  const keyword = allKeywords[Math.floor(Math.random() * allKeywords.length)]
  if (!keywords.includes(keyword)) {
    keywords.push(keyword)
  }
}

// Format the keywords as a comma-separated string
const keywordsString = keywords.join(',')

// Write the output to a file
fs.writeFile('./static/data/temp/keywords.txt', keywordsString, (err) => {
  if (err) throw err
  console.log('Keywords saved to keywords.txt file')
})
