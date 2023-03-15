import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Home() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout noFooter wrapperClassName="home-page">
            <div>
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                    Fluent Blogs
                </h1>

                <div class="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
                    <a
                        class="dark:highlight-white/20 flex h-12 w-full items-center 
                        justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white
                         hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 
                         focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
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
