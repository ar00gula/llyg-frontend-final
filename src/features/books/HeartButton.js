import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { heartAdded, heartRemoved } from './booksSlice'

export const HeartButton = ({ book }) => {
  const dispatch = useDispatch()

  const [liked, setLiked] = useState(false)

  let emoji
  if (liked === true) {
    emoji = "♥"
  } else {
    emoji = "♡"
  }

  const heartButton = 
      <div
        className="muted-button heart-button"
        onClick={() => {
          if (liked === false) {
            dispatch(heartAdded({ bookId: book.id }))
            setLiked(true)
          } else {
            dispatch(heartRemoved({ bookId: book.id }))
            setLiked(false)
          }
        }}
      >
        {emoji} {book.hearts}
      </div>

  return heartButton
}