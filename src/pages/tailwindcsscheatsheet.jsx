import React from 'react'
import tw from 'tailwind-styled-components'

import Layout from '@theme/Layout'

export default function () {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='mx-auto my-auto text-center '>
        <h1>Tailwind CSS Cheatsheet</h1>
        <table className='rounded-lg text-left text-sm text-black  shadow-xl  shadow-black dark:text-white dark:shadow-slate-50'>
          <thead>
            <tr>
              <Th>Class</Th>
              <Th>Description</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>bg-color-intensity</Td>
              <Td>Set the background color of an element.</Td>
            </tr>
            <tr>
              <Td>text-color-intensity</Td>
              <Td>Set the text color of an element.</Td>
            </tr>
            <tr>
              <Td>font-size</Td>
              <Td>Set the font size of an element.</Td>
            </tr>
            <tr>
              <Td>py-size</Td>
              <Td>Set the vertical padding of an element.</Td>
            </tr>
            <tr>
              <Td>px-size</Td>
              <Td>Set the horizontal padding of an element.</Td>
            </tr>
            <tr>
              <Td>border-size-color-intensity</Td>
              <Td>Set the border size and color of an element.</Td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

const Th = tw.th`
 
  font-semibold
  uppercase
  bg-cyan-500
`

const Td = tw.td`
  
  
`
