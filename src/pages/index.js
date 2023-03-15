import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Home() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout>
            <div>
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                    Fluent Blogs
                </h1>
                <a>https://chat.openai.com/</a>
            </div>
        </Layout>
    )
}
