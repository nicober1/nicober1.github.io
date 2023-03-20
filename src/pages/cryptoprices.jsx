import React from 'react'
import Layout from '@theme/Layout'
import CryptoPrices from '@site/src/components/CryptoPrices'

export default function () {
  return (
    <Layout noFooter wrapperClassName='live-page'>
        <CryptoPrices />
    </Layout>
  )
}
