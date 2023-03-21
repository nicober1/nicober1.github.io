import React from 'react'
import {useEffect} from 'react'

import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import Particles from 'react-particles'
import {loadSeaAnemonePreset} from 'tsparticles-preset-sea-anemone'

export default function () {
  async function customInit(engine) {
    await loadSeaAnemonePreset(engine)
  }

  return (
    <Layout noFooter wrapperClassName='live-page'>
      <Head></Head>

      <Particles
        options={{
          preset: 'seaAnemone',
        }}
        init={customInit}
      />
    </Layout>
  )
}
