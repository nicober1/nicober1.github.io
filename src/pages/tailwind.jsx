import React from 'react'

// A function that renders a tailwind css cheatsheet
export default function TailwindCheatsheet() {
  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4'>
      <div className='max-w-4xl rounded-xl bg-white p-8 shadow-xl'>
        <h1 className='mb-12 text-center text-5xl font-bold text-purple-900'>Tailwind CSS Cheatsheet</h1>
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr>
              <th className='p-4 text-left text-3xl font-semibold text-purple-800'>Layout</th>
              <th className='p-4 text-left text-3xl font-semibold text-purple-800'>Typography</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='rounded-lg bg-gray-100 p-6 shadow-lg'>
                <ul className='list-inside list-disc text-gray-700'>
                  <li>
                    <code>container</code>: sets a max-width based on the screen size
                  </li>
                  <li>
                    <code>grid</code>: creates a CSS grid layout
                  </li>
                  <li>
                    <code>grid-cols-{`{n}`}</code>: sets the number of columns in the grid
                  </li>
                  <li>
                    <code>gap-{`{n}`}</code>: sets the gap between grid items
                  </li>
                  <li>
                    <code>flex</code>: creates a flexbox layout
                  </li>
                  <li>
                    <code>flex-row</code>: sets the flex direction to row
                  </li>
                  <li>
                    <code>flex-col</code>: sets the flex direction to column
                  </li>
                  <li>
                    <code>justify-{`{start|center|end|between|around|evenly}`}</code>: sets the horizontal alignment of
                    flex items
                  </li>
                  <li>
                    <code>items-{`{start|center|end|stretch|baseline}`}</code>: sets the vertical alignment of flex
                    items
                  </li>
                </ul>
              </td>
              <td className='rounded-lg bg-gray-100 p-6 shadow-lg'>
                <ul className='list-inside list-disc text-gray-700'>
                  <li>
                    <code>text-{`{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl}`}</code>: sets the font size
                  </li>
                  <li>
                    <code>font-{`{thin|light|normal|medium|semibold|bold|extrabold|black}`}</code>: sets the font weight
                  </li>
                  <li>
                    <code>font-{`{sans|serif|mono}`}</code>: sets the font family
                  </li>
                  <li>
                    <code>text-{`{left|center|right|justify}`}</code>: sets the text alignment
                  </li>
                  <li>
                    <code>text-{`{color}`}</code>: sets the text color (e.g. <code>text-red-500</code>)
                  </li>
                </ul>
              </td>
            </tr>

            {/* Add more rows for other categories */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
