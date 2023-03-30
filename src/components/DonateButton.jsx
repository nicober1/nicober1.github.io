import React from 'react'
import {BeakerIcon} from '@heroicons/react/24/solid'

const DonateButton = () => {
  const email = 'developer@fluentblogs.com'
  const subject = 'Contact from fluentblogs.com'
  const body = 'Hello developer, I have a question about your website.'

  function handleClick() {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return (
    <div className='container mx-auto my auto flex items-center flex-wrap justify-end text-sm'>
      <button
        className='mr-1 mb-1 inline-flex  w-full items-center rounded-full border border-transparent bg-cyan-500 bg-opacity-40  px-4 py-2 text-white shadow-sm   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mr-2 sm:mb-0 sm:w-auto'
        onClick={handleClick}>
        <BeakerIcon className='mr-2 h-5 w-5' aria-hidden='true' />
        Contact developer
      </button>
      <a
        href='https://www.paypal.com/paypalme/fluentblogscom'
        target='_blank'
        rel='noopener noreferrer'
        className='mr-1 mb-1 inline-block w-full rounded-full bg-green-600 bg-opacity-40 py-2 px-4 text-white hover:bg-green-700 sm:mr-2 sm:mb-0 sm:w-auto'>
        Support Dev
      </a>

      <a
        href='https://www.buymeacoffee.com/FluentBlogs'
        target='_blank'
        rel='noopener noreferrer'
        className='w-full rounded-full bg-yellow-500 bg-opacity-40  py-2 px-4 text-white hover:bg-yellow-600 sm:w-auto'>
        Buy Developer a Coffee
      </a>
    </div>
  )
}

export default DonateButton
