// import React, {useEffect, useState} from 'react'

// import data1 from '/data/emoji.json'

// function Emoji(props) {
//   const {emojiId, image, searchTerms, shortcuts} = props.emoji

//   // A helper function that converts an array of strings into a comma-separated list
//   function formatList(array) {
//     return array.join(', ')
//   }

//   // Return the JSX element that displays the emoji and its fields
//   return (
//     <div className='emoji'>
//       <div className='emoji-id'>{emojiId}</div>
//       <img src={image.thumbnails[0].url} alt={emojiId} className='emoji-image' />
//       <div className='emoji-search-terms'>Search terms: {formatList(searchTerms)}</div>
//       <div className='emoji-shortcuts'>Shortcuts: {formatList(shortcuts)}</div>
//     </div>
//   )
// }

// // A component that renders an array of emoji objects
// export default function EmojiList() {
//   const [data, setData] = useState([])

//   // Use useEffect hook to load the data from the JSON file when the component mounts
//   useEffect(() => {
//     // Update the state with the data from the JSON file
//     setData(data1)
//   }, [])
//   // Destructure the emoji array from the props
//   const {emojis} = data

//   // Return the JSX element that maps each emoji object to an Emoji component
//   return (
//     <div className='emoji-list'>
//       {emojis.slice(0, 10).map((emoji) => (
//         <Emoji key={emoji.emojiId} emoji={emoji} />
//       ))}
//     </div>
//   )
// }
