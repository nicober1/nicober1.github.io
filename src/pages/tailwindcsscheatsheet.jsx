import React from 'react'
import tw from 'tailwind-styled-components'

import Layout from '@theme/Layout'

export default function () {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='mx-auto my-auto text-center '>
        <h1>Tailwind CSS Cheatsheet</h1>
        <Table className='rounded-2xl shadow-2xl dark:shadow-slate-50 shadow-black px-4 py-2 text-left  text-sm text-black dark:text-white'>
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
        </Table>
      </div>
    </Layout>
  )
}

const Table = tw.table`
 
`

const Th = tw.th`
 
  font-semibold
  uppercase
  bg-cyan-500
`

const Td = tw.td`
  
  
`
