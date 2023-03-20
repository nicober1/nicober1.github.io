import React from 'react'
import Layout from '@theme/Layout'
import StockList from '@site/src/components/StockList'

export default function () {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <StockList />
    </Layout>
  )
}
