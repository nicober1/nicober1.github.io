import React from 'react'
import {BeakerIcon} from '@heroicons/react/24/solid'

const DonateButton = () => {
  const email = 'developer@fluentblogs.com'
  const subject = 'Contact from fluentblogs.com'
  const body = 'Hello developer, I have a question about your website.'

  function handleClick() {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }
  return (
    <div className='flex  text-sm'>
      <button
        className='mr-2 inline-flex items-center rounded-full border border-transparent bg-indigo-600 px-4 py-2   text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={handleClick}>
        <BeakerIcon className='mr-2 h-5 w-5' aria-hidden='true' />
        Contact developer
      </button>
      <a
        href='https://www.paypal.com/paypalme/fluentblogscom'
        target='_blank'
        rel='noopener noreferrer'
        className='mr-2 inline-block rounded-full bg-green-600 py-2 px-4  text-white hover:bg-green-700'>
        Support Dev
      </a>

      <a
        href='https://www.buymeacoffee.com/FluentBlogs'
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-full bg-yellow-500 py-2 px-4  text-white hover:bg-yellow-600'>
        Buy Developer a Coffee
      </a>
    </div>
  )
}

export default DonateButton
