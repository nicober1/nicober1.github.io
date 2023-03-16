import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout noFooter wrapperClassName="home-page">
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src="https://play.tailwindcss.com/img/beams.jpg"
          alt=""
          class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Fluent Blogs
        </h1>

        <div class="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
          <a
            class=""
            target="_blank"
            href="https://chat.openai.com/"
          >
            https://chat.openai.com/
          </a>
        </div>
      </div>
    </Layout>
  )
}
