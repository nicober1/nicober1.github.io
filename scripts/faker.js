const faker = require('@faker-js/faker')
const fs = require('fs')

// Set the number of keywords to generate
const numKeywords = 10000

// Generate the keywords using Faker.js
const keywords = Array.from(
  {length: numKeywords},
  () => faker.hacker.adjective() + ' ' + faker.hacker.noun(),
)

function generateEmails() {
  const emailIds = []
  for (let i = 0; i < 100; i++) {
    emailIds.push(faker.internet.email(undefined, undefined, 'gmail.com'))
  }
  return emailIds
}

// Write the list of keywords to a file
fs.writeFile('./static/data/temp/keywords.txt', keywords.join(','), (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Successfully wrote ${numKeywords} keywords to keywords.txt`)
})