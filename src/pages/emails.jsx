import React from 'react'
import Layout from '@theme/Layout'
import {faker} from '@faker-js/faker'

function generateEmails() {
  const emailIds = []
  for (let i = 0; i < 1000; i++) {
    emailIds.push(faker.internet.email(undefined, undefined, 'gmail.com'))
  }
  return emailIds.join(', ')
}

export default function Home() {
  return (
    <div>
      <p>{generateEmails()}</p>
    </div>
  )
}
