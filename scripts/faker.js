const {faker} = require('@faker-js/faker')
const fs = require('fs')

const numKeywords = 100

const keywords = Array.from(
  {length: numKeywords},
  () => faker.word.adjective() + ' ' + faker.word.noun(),
)



fs.writeFile('./static/data/temp/keywords.txt', keywords.join(','), (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Successfully wrote ${numKeywords} keywords to keywords.txt`)
})
