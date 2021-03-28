import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleFavorite } from '../users/usersSlice'

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
            dispatch(toggleFavorite({ book_id: book.id, favorite: true }))
            setLiked(true)
          } else {
            dispatch(toggleFavorite({ book_id: book.id, favorite: false }))
            setLiked(false)
          }
        }}
      >
        {emoji}
      </div>

  return heartButton
}