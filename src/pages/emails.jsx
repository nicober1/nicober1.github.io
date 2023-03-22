import React from 'react'
import Layout from '@theme/Layout'
import {faker} from '@faker-js/faker'

function generateEmails() {
  const emailIds = []
  for (let i = 0; i < 100; i++) {
    emailIds.push(faker.internet.email(undefined, undefined, 'gmail.com'))
  }
  return emailIds
}

export default function Home() {
  return (
    <>
      {generateEmails().map((email) => {
        return (
          <div key={email}>
            <p>{email},</p>
          </div>
        )
      })}
    </>
  )
}
