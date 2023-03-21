import React from 'react'
import {useEffect} from 'react'

import Layout from '@theme/Layout'
import Head from '@docusaurus/Head'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import Particles from 'react-particles'
import {loadConfettiPreset} from 'tsparticles-preset-confetti'

export default function () {
  async function customInit(engine) {
    await loadConfettiPreset(engine)
  }

  return (
    <Layout noFooter wrapperClassName='live-page'>
      <Particles
        options={{
          preset: 'confetti',
        }}
        init={customInit}
      />
    </Layout>
  )
}
