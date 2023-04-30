import React, {useState, useEffect} from 'react'
import Loading from '@site/src/pages/1Loading'

import data1 from '/data/emoji.json'
import classNames from 'classnames'

function Emoji({emojiId, image, searchTerms = [], shortcuts = []}) {
  return (
    <div
      className={classNames('bg-cyan-200', 'text-black', 'p-4', 'm-2', 'rounded-lg', 'shadow-lg', 'hover:bg-blue-700')}
    >
      <div className={classNames('flex', 'flex-col')}>
        <div className={classNames('items-center', 'justify-center')}>
          {image && <img className='w-full rounded-t-lg object-cover' src={image.thumbnails[0]?.url} />}
        </div>
        {searchTerms.length > 0 && (
          <div className='flex'>
            <span className={classNames('text-xs', 'font-bold')}>Search terms: </span>
            <span className={classNames('text-xs', 'font-medium')}>{searchTerms.join(', ')}</span>
          </div>
        )}
        {shortcuts.length > 0 && (
          <div className='flex'>
            <span className={classNames('text-xs', 'font-bold')}>Shortcuts: </span>
            <span className={classNames('text-xs', 'font-medium')}>{shortcuts.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState(0)

  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    const start = page * 500
    const end = start + 500
    const newEmojis = data1.slice(start, end)
    setEmojis(newEmojis)
  }, [page])

  return (
    <Loading time={2000}>
      <div className='container mt-10 grid grid-cols-5 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <div className='col-span-full mt-10 flex justify-center'>
          <button onClick={() => setPage((page) => page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => setPage((page) => page + 1)} disabled={emojis.length < 500}>
            Next
          </button>
        </div>
        {emojis.map((emoji) => (
          <Emoji key={emoji.emojiId} {...emoji} />
        ))}
        <div className='col-span-full flex justify-center'>
          <button onClick={() => setPage((page) => page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => setPage((page) => page + 1)} disabled={emojis.length < 500}>
            Next
          </button>
        </div>
      </div>
    </Loading>
  )
}

export default App
