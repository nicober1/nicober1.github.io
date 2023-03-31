import React from 'react'
import Loading from '@site/src/pages/1Loading'



// Define a custom component that renders a single iframe
function Planet({title, src, maximized, onToggle}) {
  return (
    // Use a div element with Tailwind classes to create a grid item with a border
    // Use a conditional class to change the grid span based on the maximized prop
    <div className={`rounded-lg border-4 border-gray-300 ${maximized ? 'col-span-2 row-span-2' : ''}`}>
      {/* Use a div element with Tailwind classes to create a header with a title and a button */}
      <div className='flex items-center justify-between rounded-t-lg bg-gray-200 p-2'>
        {/* Use an h3 element with Tailwind classes to display the title */}
        <h3 className='text-lg font-bold'>{title}</h3>
        {/* Use a button element with Tailwind classes and an onClick handler to call the onToggle prop */}
        <button className='rounded bg-gray-300 p-1 hover:bg-gray-400' onClick={onToggle}>
          {/* Use a conditional text to display the button label based on the maximized prop */}
          {maximized ? 'Restore' : 'Maximize'}
        </button>
      </div>
      {/* Use the dangerouslySetInnerHTML prop to insert the iframe HTML */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe src='${src}' width='100%' height='450px' frameborder='0' />`,
        }}
      />
    </div>
  )
}

// Define a function component that renders four iframes
function Planets() {
  // Define a state variable to store the index of the maximized iframe
  const [maximized, setMaximized] = React.useState(null)

  // Define a function to toggle the maximized state
  const toggleMaximized = (index) => {
    // If the index is already maximized, set it to null
    // Otherwise, set it to the index
    setMaximized(maximized === index ? null : index)
  }

  // Define an array of objects to store the iframe data
  const iframes = [
    {
      title: 'Mercury',
      src: 'https://solarsystem.nasa.gov/gltf_embed/2369',
    },
    {
      title: 'Venus',
      src: 'https://solarsystem.nasa.gov/gltf_embed/2399',
    },
    {
      title: 'Earth',
      src: 'https://solarsystem.nasa.gov/gltf_embed/2371',
    },
    {
      title: 'Mars',
      src: 'https://solarsystem.nasa.gov/gltf_embed/2367',
    },
    {
      title: 'Titan',
      src: 'https://solarsystem.nasa.gov/gltf_embed/2347',
    },
  ]

  return (
    <Loading>
      <div className='container mt-20 mx-auto' style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10}}>
        <div className='mt-20 grid grid-cols-2 gap-4 p-7'>
          {/* Use the map method to iterate over the iframes array and render each iframe using the custom component */}
          {iframes.map((iframe, index) => (
            // Pass the iframe data and the state and handler props to the custom component
            <Planet
              key={index}
              title={iframe.title}
              src={iframe.src}
              maximized={maximized === index}
              onToggle={() => toggleMaximized(index)}
            />
          ))}
        </div>
      </div>
    </Loading>
  )
}

export default Planets
